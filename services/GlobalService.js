'use strict'

const {
  writeLog,
  DbNull,
  RemoveSpecialCharacter,
} = require('../apps/helpers/utils')
const postgreConnection = require('../apps/helpers/sequelizeHelper')
const {
  buildToken,
  stringDecrypt,
  encrypt,
  stringEncrypt,
} = require('../apps/JWT/encrypt-decrypt')
const { Jwt } = require('../apps/JWT/jwt')
const { response } = require('express')

class GlobalService {
  static async GetMenuList(tokenDetails) {
    let listMenu = null;
    let dicMenu = null;

    const dtMenu = await GlobalService.LoadMenus(tokenDetails);
    if (dtMenu !== null) {
        listMenu = [];
        for (let row of dtMenu) {
            dicMenu = {};
        
            if (row.haschild !== undefined && row.haschild !== null && row.haschild !== false) {
                dicMenu["id"] = row.menuid !== undefined ? row.menuid : null;
                dicMenu["captionname"] = row.captionname !== undefined ? row.captionname : null;
                dicMenu["title"] = row.titlename !== undefined ? row.titlename : null;
                dicMenu["url"] = row.url !== undefined ? row.url : null;
                dicMenu["imagename"] = row.imagename !== undefined ? row.imagename : null;
                dicMenu["formid"] = row.formid !== undefined ? row.formid : null;
                dicMenu["parentId"] = 0;
            } else {
                dicMenu["id"] = row.menuid !== undefined ? row.menuid : null;
                dicMenu["captionname"] = row.captionname !== undefined ? row.captionname : null;
                dicMenu["title"] = row.titlename !== undefined ? row.titlename : null;
                dicMenu["url"] = row.url !== undefined ? row.url : null;
                dicMenu["imagename"] = row.imagename !== undefined ? row.imagename : null;
                dicMenu["parentId"] = row.parentid !== undefined ? row.parentid : null;
                dicMenu["formid"] = row.formid !== undefined ? row.formid : null;
            }
            
            listMenu.push(dicMenu);
        }
        writeLog(`-----------menu Query List------------------: ${listMenu}`);
    }
    return listMenu;
  }

  static async LoadMenus(tokenDetails){
    let sQuery = "";

    sQuery= `SELECT display_order, menuid, captionname, titlename, COALESCE(url, '') AS url, COALESCE(imagename, '') AS imagename,
            parentid, COALESCE(haschild, false) AS haschild, COALESCE(formid, 0) AS formid
            FROM tbl_menu_configuration
            WHERE isactive = TRUE AND parentid = 0
            UNION
            SELECT tmc.display_order, tmc.menuid, captionname, titlename, COALESCE(url, '') AS url, COALESCE(imagename, '') AS imagename,
            parentid, COALESCE(haschild, false) AS haschild, COALESCE(formid, 0) AS formid
            FROM tbl_menu_configuration tmc
            INNER JOIN tbl_secuserrole tur ON tmc.menuid = tur.menuid
            WHERE tmc.isactive = TRUE AND tur.isactive = TRUE AND parentid <> 0
            AND userid = ${tokenDetails.UserId}
            ORDER BY display_order;`

    writeLog(`-----------menu Query------------------: ${sQuery}`)
    const dtform = await postgreConnection.query(sQuery);
    return dtform;
  }
}

module.exports = GlobalService
