from unicodedata import name
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

        craft_name = data.get('craft_name')
        craft_japanese_name = data.get('craft_japanese_name')
        craft_region = data.get('craft_region')
        craft_url = data.get('craft_url')

        # Check Body Data
        if utils.check_none(craft_name, craft_japanese_name, craft_region, craft_url):
            raise BadRequestError("Bad body data")

        # DBに接続
        data_accessor = DatabaseAccess()

        # 工芸品の名前が重複された場合は拒否
        result = data_accessor.select_craft_by_name(craft_name)
        if result:
            raise BadRequestError("Duplicate account")

        # 工芸品情報をDBに登録
        data_accessor.insert_craft(craft_name, craft_japanese_name, craft_region, craft_url,)

        # 工芸品情報登録を検証
        result = data_accessor.select_craft_by_name(craft_name)
        if result:
            res_craft_id= result[0][0]
            res_craft_name = result[0][1]
            res_craft_japanese_name = result[0][2]
            res_craft_region = result[0][3]
            res_craft_url = result[0][4]
            res_created_at = utils.convert_date_format(result[0][5])
            res_updated_at = utils.convert_date_format(result[0][6])

            if res_craft_name == craft_name:
                # 登録成功を返す
                return ResCreateSuccess(
                    body={
                        "craft_id": res_craft_id,
                        "craft_name": res_craft_name,
                        "craft_japanese_name": res_craft_japanese_name,
                        "craft_region": res_craft_region,
                        "craft_url": res_craft_url,
                        "created_at": res_created_at,
                        "updated_at": res_updated_at,
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
