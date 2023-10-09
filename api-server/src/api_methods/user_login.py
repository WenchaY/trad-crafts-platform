from flask import make_response, jsonify
from utils import logger, utils
from models.http_codes import ResSuccess, ResBadRequest, ResInternalServerError, ResNotFound, ResForbidden
from models.exceptions import BadRequestError
from data.data_access import DatabaseAccess

logger = logger.get_logger(__name__)


def login_user(data: dict) -> ResSuccess:
    '''ユーザーログイン'''

    logger.info(
        {
            "tag": "Users",
            "type": "login",
            "message": "Request received",
            "data":  data,
        }
    )

    try:
        # Check Request Body
        if utils.check_none(data):
            raise BadRequestError("Body is None")

        account = data.get('account')
        password = data.get('password')

        # Check Body Data
        if utils.check_none(account, password):
            raise BadRequestError("Bad body data")

        # DBに接続
        data_accessor = DatabaseAccess()

        # accountが存在しない場合は拒否
        result = data_accessor.select_user_by_account(account)
        if not result:
            return ResNotFound()

        res_uid = result[0][0]
        res_password = result[0][2]

        # passwordが異なる場合は拒否 
        if len(result)==0 or res_password != password:
            raise BadRequestError("Password error")

        # TODO: APIkey検証    
        # if not validate_cookie(request.cookies.get('user_cookie')):
        #     return ResForbidden()

        # ログイン成功を返す
        response = ResSuccess(
            body={
                "message": "Create cookie",
                "cookie": "Cookie"+str(res_uid)
            }
        )
        # レスポンスをJSON化して作成
        response_json = jsonify(response.body)
        # レスポンスにクッキーを設定
        response_with_cookie = make_response(response_json)
        response_with_cookie.set_cookie('Cookie', 'Cookie'+str(res_uid), httponly=True, secure=True)
        return response_with_cookie

    except BadRequestError as err:
        logger.warning(
            {
                "tag": "Users",
                "type": "login",
                "message": err,
            }
        )
        return ResBadRequest()

    except Exception as err:
        logger.exception(
            {
                "tag": "Users",
                "type": "login",
                "message": "Exception",
                "error": err,
            }
        )
        return ResInternalServerError()
        