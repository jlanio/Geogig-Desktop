var sql = require('sql.js');
var fs = require("fs");
var request = require('request');
// Create a database
// var db = new sql.Database();

let createGPKGtable = function () {
  let sql = `CREATE TABLE gpkg_contents ( table_name TEXT NOT NULL PRIMARY KEY, data_type TEXT NOT NULL, identifier TEXT UNIQUE, description TEXT DEFAULT '', last_change DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')), min_x DOUBLE, min_y DOUBLE, max_x DOUBLE, max_y DOUBLE, srs_id INTEGER, CONSTRAINT fk_gc_r_srs_id FOREIGN KEY (srs_id) REFERENCES gpkg_spatial_ref_sys(srs_id) );`
    sql += `CREATE TABLE gpkg_data_column_constraints ( constraint_name TEXT NOT NULL, constraint_type TEXT NOT NULL, value TEXT, min NUMERIC, min_is_inclusive BOOLEAN, max NUMERIC, max_is_inclusive BOOLEAN, description TEXT, CONSTRAINT gdcc_ntv UNIQUE (constraint_name, constraint_type, value) );`
    sql += `CREATE TABLE gpkg_data_columns ( table_name TEXT NOT NULL, column_name TEXT NOT NULL, name TEXT, title TEXT, description TEXT, mime_type TEXT, constraint_name TEXT, CONSTRAINT pk_gdc PRIMARY KEY (table_name, column_name), CONSTRAINT fk_gdc_tn FOREIGN KEY (table_name) REFERENCES gpkg_contents(table_name) );`
    sql += `CREATE TABLE gpkg_extensions ( table_name TEXT, column_name TEXT, extension_name TEXT NOT NULL, definition TEXT NOT NULL, scope TEXT NOT NULL, CONSTRAINT ge_tce UNIQUE (table_name, column_name, extension_name) );`
    sql += `CREATE TABLE gpkg_geometry_columns ( table_name TEXT NOT NULL, column_name TEXT NOT NULL, geometry_type_name TEXT NOT NULL, srs_id INTEGER NOT NULL, z TINYINT NOT NULL, m TINYINT NOT NULL, CONSTRAINT pk_geom_cols PRIMARY KEY (table_name, column_name), CONSTRAINT uk_gc_table_name UNIQUE (table_name), CONSTRAINT fk_gc_tn FOREIGN KEY (table_name) REFERENCES gpkg_contents(table_name), CONSTRAINT fk_gc_srs FOREIGN KEY (srs_id) REFERENCES gpkg_spatial_ref_sys (srs_id) );`
    sql += `CREATE TABLE gpkg_metadata ( id INTEGER CONSTRAINT m_pk PRIMARY KEY ASC NOT NULL, md_scope TEXT NOT NULL DEFAULT 'dataset', md_standard_uri TEXT NOT NULL, mime_type TEXT NOT NULL DEFAULT 'text/xml', metadata TEXT NOT NULL );`
    sql += `CREATE TABLE gpkg_metadata_reference ( reference_scope TEXT NOT NULL, table_name TEXT, column_name TEXT, row_id_value INTEGER, timestamp DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')), md_file_id INTEGER NOT NULL, md_parent_id INTEGER, CONSTRAINT crmr_mfi_fk FOREIGN KEY (md_file_id) REFERENCES gpkg_metadata(id), CONSTRAINT crmr_mpi_fk FOREIGN KEY (md_parent_id) REFERENCES gpkg_metadata(id) );`
    sql += `CREATE TABLE gpkg_spatial_ref_sys ( srs_name TEXT NOT NULL, srs_id INTEGER NOT NULL PRIMARY KEY, organization TEXT NOT NULL, organization_coordsys_id INTEGER NOT NULL, definition TEXT NOT NULL, description TEXT );`
    sql += `CREATE TABLE gpkg_tile_matrix ( table_name TEXT NOT NULL, zoom_level INTEGER NOT NULL, matrix_width INTEGER NOT NULL, matrix_height INTEGER NOT NULL, tile_width INTEGER NOT NULL, tile_height INTEGER NOT NULL, pixel_x_size DOUBLE NOT NULL, pixel_y_size DOUBLE NOT NULL, CONSTRAINT pk_ttm PRIMARY KEY (table_name, zoom_level), CONSTRAINT fk_tmm_table_name FOREIGN KEY (table_name) REFERENCES gpkg_contents(table_name) );`
    sql += `CREATE TABLE gpkg_tile_matrix_set ( table_name TEXT NOT NULL PRIMARY KEY, srs_id INTEGER NOT NULL, min_x DOUBLE NOT NULL, min_y DOUBLE NOT NULL, max_x DOUBLE NOT NULL, max_y DOUBLE NOT NULL, CONSTRAINT fk_gtms_table_name FOREIGN KEY (table_name) REFERENCES gpkg_contents(table_name), CONSTRAINT fk_gtms_srs FOREIGN KEY (srs_id) REFERENCES gpkg_spatial_ref_sys (srs_id) );`
    // sql += `CREATE TABLE sqlite_sequence(name,seq);`
  return sql
}

let createGeogigTable = function () {
  let sql = `CREATE TABLE geogig_audited_tables (table_name VARCHAR, mapped_path VARCHAR, audit_table VARCHAR, commit_id VARCHAR);`
      sql += `CREATE TABLE geogig_metadata (repository_uri VARCHAR);`
  return sql
}

let createGPKGLayer = function (layerName) {
  let sql = `CREATE TABLE ${layerName} ( "fid" INTEGER PRIMARY KEY AUTOINCREMENT, "geometria" MULTIPOLYGON );`
    sql += `CREATE TABLE ${layerName}_fids (gpkg_fid VARCHAR, geogig_fid VARCHAR, PRIMARY KEY(gpkg_fid));`
    sql += `CREATE TABLE ${layerName}_audit ("fid" INTEGER, "geometria" MULTIPOLYGON, audit_timestamp INTEGER DEFAULT CURRENT_TIMESTAMP, audit_op INTEGER);`
    sql += `CREATE TRIGGER '${layerName}_audit_delete' AFTER DELETE ON '${layerName}' BEGIN INSERT INTO '${layerName}_audit' ('fid', audit_op) VALUES (OLD.fid, 3); END;`
    sql += `CREATE TRIGGER '${layerName}_audit_insert' AFTER INSERT ON '${layerName}' BEGIN INSERT INTO '${layerName}_audit' ('fid', 'geometria', audit_op) VALUES (NEW.'fid', NEW.'geometria', 1); END;`
    sql += `CREATE TRIGGER '${layerName}_audit_update' AFTER UPDATE ON '${layerName}' BEGIN INSERT INTO '${layerName}_audit' ('fid', 'geometria', audit_op) VALUES (NEW.'fid', NEW.'geometria', 2); END;`
    // sql+= `INSERT INTO gpkg_spatial_ref_sys(srs_name, srs_id, organization, organization_coordsys_id, definition, description)
    //        VALUES ('WGS 84 geodetic','4326','EPSG','4326','GEOGCS["WGS 84", DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.257223563,AUTHORITY["EPSG","7030"]],AUTHORITY["EPSG","6326"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4326"]]', 'longitude/latitude coordinates in decimal degrees on the WGS 84 spheroid');`
    sql += `INSERT INTO gpkg_contents(table_name, data_type, identifier, description, min_x, min_y, max_x, max_y, srs_id)
			      VALUES ('${layerName}', 'features', '${layerName}', 'testando', -0, -0, 0, 0, 4326);`
    sql += `INSERT INTO gpkg_geometry_columns (table_name, column_name, geometry_type_name, srs_id, z, m)
            VALUES ('${layerName}', 'geometria', 'MultiPolygon',4326, 0, 0);`
  return sql
}

var createNewLayer = function (currentRepoName, currentGPKG, layerName, currentUri) {
  var db = new SQL.Database(fs.readFileSync(`${currentGPKG}`));
  // db.run(createGPKGtable())
  // db.run(createGeogigTable())
  console.log(currentGPKG.search('empty'));
  if(currentGPKG.search('empty') > 1){
    LocalStorage.set(currentUri.uri, `${process.cwd()}\\${currentRepoName}.gpkg`);
  }
  db.run(createGPKGLayer(`${layerName}`));
  fs.writeFileSync(`${currentRepoName}.gpkg`, db.export());
}
/**
 * Promise based download file method
 */
var openGPKG = function (currentGPKG, column) {
  let db = new SQL.Database(fs.readFileSync(`${currentGPKG}`));
  let query = db.exec(`SELECT * FROM sqlite_master WHERE type='table' AND name='${column}';`);
  return query.length === 0 ? false : true
}


function downloadFile(configuration){
    return new Promise(function(resolve, reject){
        // Save variable to know progress
        var received_bytes = 0;
        var total_bytes = 0;

        var req = request({
            method: 'GET',
            uri: configuration.remoteFile
        });

        var out = fs.createWriteStream(configuration.localFile);
        req.pipe(out);

        req.on('response', function ( data ) {
            // Change the total bytes value to get progress later.
            total_bytes = parseInt(data.headers['content-length' ]);
        });

        // Get progress if callback exists
        if(configuration.hasOwnProperty("onProgress")){
            req.on('data', function(chunk) {
                // Update the received bytes
                received_bytes += chunk.length;

                configuration.onProgress(received_bytes, total_bytes);
            });
        }else{
            req.on('data', function(chunk) {
                // Update the received bytes
                received_bytes += chunk.length;
            });
        }

        req.on('end', function() {
            resolve();
        });
    });
}
let downloadGKPG = (remoteFile, localFile) => downloadFile({
    remoteFile: `${remoteFile}`,
    localFile: `${localFile}`,
    onProgress: (received,total) => {
        var percentage = (received * 100) / total;
        console.log(percentage + "% | " + received + " bytes out of " + total + " bytes.");
    }
}).then(() => {
    alert("File succesfully downloaded");
});
