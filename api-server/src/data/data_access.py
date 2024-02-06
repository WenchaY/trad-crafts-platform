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


    def select_craft_by_japanese_name(self, japanese_name: str) -> list:
            """
            工芸品の日本語名前で工芸品の情報を取得
            
            Args:
                japanese_name (str): 工芸品の日本語名前

            Returns:
                list: DB取得結果のList
            """

            try:
                sql = """
                        SELECT craft_id, name, japanese_name, url, created_at, updated_at, is_deleted
                        FROM craft_location
                        WHERE japanese_name = %s AND NOT is_deleted;
                    """
                data = (japanese_name,)
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


    def select_craft_characteristic_by_craft_id(self, craft_id: int) -> list:
            """
            工芸品のcraft_idで工芸品の特徴語を取得
            
            Args:
                craft_id (int): 工芸品のcraft_id

            Returns:
                list: DB取得結果のList
            """

            try:
                sql = """
                        SELECT craft_id, description, region, category, material, atmosphere, manufacturing, era
                        FROM craft_characteristic 
                        WHERE craft_id=%s AND NOT is_deleted;
                    """
                data = (craft_id,)
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


    def insert_craft(self, name: str, japanese_name: str, url: str):
            '''工芸品情報を登録'''

            try:
                sql = "INSERT INTO craft_location (name, japanese_name, url) VALUES (%s, %s, %s);"
                data = (name, japanese_name, url)
                
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


    def insert_craft_characteristic(self, craft_id: int, description: str, region: str, category: str, material: str, atmosphere: str, manufacturing: str, era: str):
            '''工芸品特徴語を登録'''

            try:
                sql = "INSERT INTO craft_characteristic (craft_id, description, region, category, material, atmosphere, manufacturing, era) VALUES (%s, %s, %s, %s, %s, %s, %s, %s);" 
                data = (craft_id, description, region, category, material, atmosphere, manufacturing, era)

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


    def update_craft_by_japanese_name(self,  japanese_name: str, name: str, url:str) -> list:
            """
            工芸品の日本語名前で工芸品の情報を更新
            
            Args:
                japanese_name (str): 工芸品の日本語名前

            Returns:
                list: DB取得結果のList
            """

            try:
                sql = " UPDATE craft_location SET name = %s, url = %s WHERE japanese_name = %s AND NOT is_deleted;"
                data = (japanese_name, name, url)
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


    def update_craft_characteristic(self, craft_id: int, description: str, region: str, category: str, material: str, atmosphere: str, manufacturing: str, era: str):
            '''工芸品特徴語を更新'''

            try:
                sql = """
                        UPDATE craft_characteristic
                        SET description = %s, region = %s, category = %s, material = %s, atmosphere = %s, manufacturing = %s, era = %s
                        WHERE craft_id = %s;
                    """
                data = (craft_id, description, region, category, material, atmosphere, manufacturing, era)
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
