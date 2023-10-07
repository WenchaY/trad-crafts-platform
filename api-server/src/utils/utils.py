import os
from datetime import datetime
import pytz

# Logger 取得
from utils import logger
logger = logger.get_logger(__name__)

# .envファイルをロード
from dotenv import load_dotenv
load_dotenv()


def check_none(*args) -> bool:
    """
    パラメータにNoneを検証

    Args:
        *args: 検証するパラメータ

    Returns:
        bool: パラメータに1つがNoneの場合、return True. 
                1つも無かったら、return False.
    """
    return any(arg is None for arg in args)


def convert_date_format(date: datetime) -> str:
    """
    日付を日付文字列形式(ISO 8601)に変換

    Args:
        date (datetime): 変換したい日付

    Returns:
        str: 変換後の日付文字列
    """

    try:
        # Timezone Objectを取得
        TIMEZONE = os.getenv('TIMEZONE', 'Asia/Tokyo')
        timezone = pytz.timezone(TIMEZONE)

        # Datetime Objectを目標の形式の文字列（日付文字列）に変換
        date_with_timezone = timezone.localize(date)
        formatted_date = date_with_timezone.strftime('%Y-%m-%dT%H:%M:%S%z')

        return formatted_date

    except Exception as err:
        logger.exception(
            {
                "tag": "Utils",
                "type": "convert_date_format",
                "message": "Exception",
                "error": err,
            }
        )
