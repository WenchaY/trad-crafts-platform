from utils import logger, utils
from models.http_codes import ResSuccess, ResBadRequest, ResInternalServerError, ResNotFound, ResForbidden
from models.exceptions import BadRequestError
from data.data_access import DatabaseAccess

logger = logger.get_logger(__name__)


def get_user_by_uid(uid: dict) -> ResSuccess:
    '''UIDでユーザー情報取得'''

    logger.info(
        {
            "tag": "Users",
            "type": "User_get_by_uid",
            "message": "Request received",
            "data": uid,
        }
    )

    try:
        # Check Request Body
        if utils.check_none(uid):
            raise BadRequestError("Request data is None")

        # DBに接続
        data_accessor = DatabaseAccess()

        # uidが存在しない場合は拒否
        result = data_accessor.select_user_by_uid(uid)
        if not result:
            return ResNotFound()

        res_uid = result[0][0]
        res_account = result[0][1]
        res_nickname = result[0][3]
        res_created_at = utils.convert_date_format(result[0][4])
        res_updated_at = utils.convert_date_format(result[0][5])

        # query結果を返す
        return ResSuccess(
            body={
                "uid": res_uid,
                "account": res_account,
                "nickname": res_nickname,
                "created_at": res_created_at,
                "updated_at": res_updated_at,
            }
        )

        # TODO: APIkey検証    
        # if not validate_cookie(request.cookies.get('user_cookie')):
        #     return ResForbidden()

    except BadRequestError as err:
        logger.warning(
            {
                "tag": "Users",
                "type": "User_get_by_uid",
                "message": err,
            }
        )
        return ResBadRequest()

    except Exception as err:
        logger.exception(
            {
                "tag": "Users",
                "type": "User_get_by_uid",
                "message": "Exception",
                "error": err,
            }
        )
        return ResInternalServerError()
