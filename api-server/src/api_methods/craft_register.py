from utils import logger, utils
from models.http_codes import ResCreateSuccess, ResBadRequest, ResInternalServerError
from models.exceptions import BadRequestError
from data.data_access import DatabaseAccess

logger = logger.get_logger(__name__)


def register_craft(data: dict) -> ResCreateSuccess:
    '''工芸品登録'''

    logger.info(
        {
            "tag": "Crafts",
            "type": "register",
            "message": "Request received",
            "data":  data,
        }
    )

    try:
        # Check Request Body
        if utils.check_none(data):
            raise BadRequestError("Body is None")

        name = data.get('name')
        japanese_name = data.get('japanese_name')
        url = data.get('url')
        description = data.get('description')
        region = data.get('region')
        category = data.get('category')
        material = data.get('material')
        atmosphere = data.get('atmosphere')
        manufacturing = data.get('manufacturing')
        era = data.get('era')


        # Check Body Data
        if utils.check_none(name, region, url, japanese_name):
            raise BadRequestError("Bad body data")

        # DBに接続
        data_accessor = DatabaseAccess()

        # 工芸品情報をDBに登録
        result = data_accessor.select_craft_by_japanese_name(japanese_name)
        craft_id = result[0][0]
        if result:
            data_accessor.update_craft_by_japanese_name(japanese_name, name, url)
            data_accessor.update_craft_characteristic(craft_id, description, region, category, material, atmosphere, manufacturing, era)
        else:
        # 工芸品の日本語名前が重複された場合は上書き
            data_accessor.insert_craft(name, japanese_name, url)
            data_accessor.insert_craft_characteristic(craft_id, description, region, category, material, atmosphere, manufacturing, era)
        
        # 工芸品情報登録を検証
        result = data_accessor.select_craft_by_japanese_name(japanese_name)
        result_characteristic = data_accessor.select_craft_characteristic_by_craft_id(craft_id)

        if result and result_characteristic:
            res_craft_id= result[0][0]
            res_name = result[0][1]
            res_japanese_name = result[0][2]
            res_url = result[0][3]
            res_description = result_characteristic[0][1]
            res_region = result_characteristic[0][2]  
            res_category = result_characteristic[0][3]
            res_meterial = result_characteristic[0][4]
            res_atmosphere = result_characteristic[0][5]
            res_manufacturing = result_characteristic[0][6]
            res_era = result_characteristic[0][7]


            if res_name == name:
                # 登録成功を返す
                return ResCreateSuccess(
                    body={
                        "craft_id": res_craft_id,
                        "name": res_name,
                        "region": res_region,
                        "url": res_url,
                        "japanese_name": res_japanese_name,
                        "category": res_category,
                        "material": res_meterial,
                        "atmosphere": res_atmosphere,
                        "manufacturing": res_manufacturing,
                        "era": res_era,
                        "description": res_description,
                    }
                )

    except BadRequestError as err:
        logger.warning(
            {
                "tag": "Crafts",
                "type": "register",
                "message": err,
            }
        )
        return ResBadRequest()

    except Exception as err:
        logger.exception(
            {
                "tag": "Crafts",
                "type": "register",
                "message": "Exception",
                "error": err,
            }
        )
        return ResInternalServerError()
