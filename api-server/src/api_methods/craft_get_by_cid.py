from utils import logger, utils
from models.http_codes import ResSuccess, ResBadRequest, ResInternalServerError, ResNotFound, ResForbidden
from models.exceptions import BadRequestError
from data.data_access import DatabaseAccess

logger = logger.get_logger(__name__)


def get_craft_by_cid(craft_id: dict) -> ResSuccess:
    '''craft_idで工芸品詳細情報取得'''

    logger.info(
        {
            "tag": "Crafts",
            "type": "Craft_get_by_cid",
            "message": "Request received",
            "data": craft_id,
        }
    )

    try:
        # Check Request Body
        if utils.check_none(craft_id):
            raise BadRequestError("Request data is None")

        # DBに接続
        data_accessor = DatabaseAccess()

        # craft_idが存在しない場合は拒否
        result = data_accessor.select_craft_by_craft_id(craft_id)
        result_characteristic = data_accessor.select_craft_characteristic_by_craft_id(craft_id)

        if not result:
            return ResNotFound()

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

        # query結果を返す
        return ResSuccess(
            body={
                "cid": res_craft_id,
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
                "type": "craft_get_by_cid",
                "message": err,
            }
        )
        return ResBadRequest()

    except Exception as err:
        logger.exception(
            {
                "tag": "Users",
                "type": "Craft_get_by_cid",
                "message": "Exception",
                "error": err,
            }
        )
        return ResInternalServerError()
