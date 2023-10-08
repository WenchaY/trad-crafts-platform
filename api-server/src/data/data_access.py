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


    def insert_user(self, account: str, password: str, nickname: str):
        '''ユーザ情報を登録'''

        try:
            sql = "INSERT INTO users (account, password, nickname) VALUES (%s, %s, %s);"
            data = (account, password, nickname,)
            self.sql_execute(sql, data)

        except ValueError as err:
            logger.error(
                {
                    "tag": "DB",
                    "type": "method",
                    "message": "Method value error",
                    "error": err,
                }
            )


    def select_user_by_account(self, account: str) -> list:
        """
        ユーザーログインアカウントでユーザー情報を取得
        
        Args:
            account (str): ユーザーのログインアカウント

        Returns:
            list: DB取得結果のList
        """

        try:
            sql = """
                    SELECT uid, account, password, nickname, created_at, updated_at, is_deleted
                    FROM users 
                    WHERE account=%s AND NOT is_deleted;
                """
            data = (account,)
            result = self.sql_query(sql, data)
            return result

        except ValueError as err:
            logger.error(
                {
                    "tag": "DB",
                    "type": "method",
                    "message": "Method value error",
                    "error": err,
                }
            )


    def select_user_by_uid(self, uid: int) -> list:
        """
        UIDでユーザー情報を取得
        
        Args:
            uid (int): ユーザーID

        Returns:
            list: DB取得結果のList
        """

        try:
            sql = """
                    SELECT uid, account, password, nickname, created_at, updated_at, is_deleted
                    FROM users 
                    WHERE uid=%s AND NOT is_deleted;
                """
            data = (uid,)
            result = self.sql_query(sql, data)
            return result

        except ValueError as err:
            logger.error(
                {
                    "tag": "DB",
                    "type": "method",
                    "message": "Method value error",
                    "error": err,
                }
            )
