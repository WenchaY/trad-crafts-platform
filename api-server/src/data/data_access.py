import os
import mysql.connector

from utils.singleton import Singleton

# .envファイルをロード
from dotenv import load_dotenv
load_dotenv()

# Logger 取得 
from utils import logger
logger = logger.get_logger(__name__)


class DatabaseAccess(metaclass=Singleton):
    '''MySQLに接続用クラス (Singleton)'''

    def __init__(self) -> None:
        self.conn = self.connetc_mysql()

    def connetc_mysql(self) -> mysql.connector.connection:
        '''MySQLと接続する'''
        try:
            # DB Connection Config設定
            db_config = {
                'host': os.getenv('DB_HOST'),
                'user': os.getenv('DB_USER'),
                'password': os.getenv('DB_PASSWORD'),
                'database': os.getenv('DB_DATABASE'),
            }
            # DB Connection 発行
            conn = mysql.connector.connect(**db_config)
            return conn

        except Exception as err:
            logger.error(
                {
                    "tag": "DB",
                    "type": "connect",
                    "message": "Failed to connect to database",
                    "error": err,
                }
            )


    def sql_execute(self, sql: str, data: tuple = ()):
        '''SQL文を実行'''

        try:
            cursor = self.conn.cursor()
            cursor.execute(sql, data)

            self.conn.commit()
            cursor.close()

        except Exception as err:
            logger.error(
                {
                    "tag": "DB",
                    "type": "execute",
                    "message": "Failed to execute sql",
                    "error": err,
                }
            )


    def sql_query(self, sql: str, data: tuple = tuple()) -> list:
        '''Query SQL文を実行'''

        try:
            cursor = self.conn.cursor()
            cursor.execute(sql, data)

            result = cursor.fetchall()
            cursor.close()
            return result

        except Exception as err:
            logger.error(
                {
                    "tag": "DB",
                    "type": "query",
                    "message": "Failed to query sql",
                    "error": err,
                }
            )
