from utils import logger, utils
from models.http_codes import ResSuccess, ResBadRequest, ResInternalServerError,ResNotFound
from models.exceptions import BadRequestError
from data.data_access import DatabaseAccess


logger = logger.get_logger(__name__)


def changepwd_user(data: dict) -> ResSuccess:
    '''ユーザーパスワード変更'''

    logger.info(
        {
            "tag": "Users",
            "type": "Change password",
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
        new_pwd = data.get('new_password')

        # Check Body Data
        if utils.check_none(account, password, new_pwd):
            raise BadRequestError("Bad body data")

        # DBに接続
        data_accessor = DatabaseAccess()

        # accountが存在しない場合は拒否
        result = data_accessor.select_user_by_account(account)
        if not result:
            return ResNotFound()

        # passwordが異なる場合は拒否
        res_password = result[0][2]
        if res_password != password:
            raise BadRequestError("Password error")
        
        # 二回のpasswordが一致する場合は拒否
        if new_pwd == password:
            raise BadRequestError("Consistent passwords")
        
        # ユーザーのpasswordをDBに登録
        data_accessor.update_user_password(account, new_pwd,)

        #password登録成功するかどうかを検証
        result = data_accessor.select_user_by_account(account)
        if not result:
            return ResNotFound()
        
        res_uid = result[0][0]
        res_account = result[0][1]
        res_new_password = result[0][2]
        res_nickname = result[0][3]
        res_created_at = utils.convert_date_format(result[0][4])
        res_updated_at = utils.convert_date_format(result[0][5])

        if res_new_password == new_pwd and res_account == account:
        # 登録成功を返す
            return ResSuccess(
                body={
                    "uid": res_uid,
                    "account": res_account,
                    "nickname": res_nickname,
                    "created_at": res_created_at,
                    "updated_at": res_updated_at,
                }
            )
        else:
            return ResInternalServerError()


    except BadRequestError as err:
        logger.warning(
            {
                "tag": "Users",
                "type": "Change password",
                "message": err,
            }
        )
        return ResBadRequest()

    except Exception as err:
        logger.exception(
            {
                "tag": "Users",
                "type": "Change password",
                "message": "Exception",
                "error": err,
            }
        )
        return ResInternalServerError()
