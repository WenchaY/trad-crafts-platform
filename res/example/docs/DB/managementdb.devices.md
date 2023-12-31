﻿# devices

## テーブル情報

| 項目                           | 値                                                                                                   |
|:-------------------------------|:-----------------------------------------------------------------------------------------------------|
| システム名                     | Devices Management                                                                                   |
| サブシステム名                 |                                                                                                      |
| 論理テーブル名                 |                                                                                                      |
| 物理テーブル名                 | devices                                                                                              |
| 作成者                         | zhong_houji                                                                                          |
| 作成日                         | 2022/08/19                                                                                           |
| RDBMS                          |  8.0.29                                                                                              |



## カラム情報

| No. | 論理名                         | 物理名                         | データ型                       | Not Null | デフォルト           | 備考                           |
|----:|:-------------------------------|:-------------------------------|:-------------------------------|:---------|:---------------------|:-------------------------------|
|   1 |                                | id                             | bigint unsigned auto_increment | Yes (PK) |                      |                                |
|   2 |                                | user_id                        | bigint unsigned                | Yes      |                      |                                |
|   3 |                                | device_group_id                | bigint unsigned                |          |                      |                                |
|   4 |                                | name                           | varchar(255)                   | Yes      |                      |                                |
|   5 |                                | state                          | tinyint                        | Yes      |                      |                                |
|   6 |                                | type                           | tinyint                        | Yes      |                      |                                |
|   7 |                                | token                          | varchar(255)                   | Yes      |                      |                                |
|   8 |                                | created_at                     | timestamp                      | Yes      | CURRENT_TIMESTAMP    |                                |
|   9 |                                | updated_at                     | timestamp on update CURRENT_TIMESTAMP | Yes      | CURRENT_TIMESTAMP    |                                |



## インデックス情報

| No. | インデックス名                 | カラムリスト                             | ユニーク   | 備考                           | 
|----:|:-------------------------------|:-----------------------------------------|:-----------|:-------------------------------|
|   1 | PRIMARY                        | id                                       | Yes        |                                |
|   2 | user_id                        | user_id                                  |            |                                |



## 制約情報

| No. | 制約名                         | 種類                           | 制約定義                       |
|----:|:-------------------------------|:-------------------------------|:-------------------------------|
|   1 | PRIMARY                        | PRIMARY KEY                    | id                             |



## 外部キー情報

| No. | 外部キー名                     | カラムリスト                             | 参照先                         | 参照先カラムリスト                       |
|----:|:-------------------------------|:-----------------------------------------|:-------------------------------|:-----------------------------------------|
|   1 | managementdb.devices_ibfk_1    | user_id                                  | managementdb.users             | id                                       |



## 外部キー情報(PK側)

| No. | 外部キー名                     | カラムリスト                             | 参照元                         | 参照元カラムリスト                       |
|----:|:-------------------------------|:-----------------------------------------|:-------------------------------|:-----------------------------------------|



## トリガー情報

| No. | トリガー名                     | イベント                                 | タイミング           | 条件                           |
|----:|:-------------------------------|:-----------------------------------------|:---------------------|:-------------------------------|



## RDBMS固有の情報

| No. | プロパティ名                   | プロパティ値                                                                                         |
|----:|:-------------------------------|:-----------------------------------------------------------------------------------------------------|
|   1 | TABLE_CATALOG                  | def                                                                                                  |
|   2 | TABLE_SCHEMA                   | managementdb                                                                                         |
|   3 | TABLE_NAME                     | devices                                                                                              |
|   4 | TABLE_TYPE                     | BASE TABLE                                                                                           |
|   5 | ENGINE                         | InnoDB                                                                                               |
|   6 | VERSION                        | 10                                                                                                   |
|   7 | ROW_FORMAT                     | Dynamic                                                                                              |
|   8 | TABLE_ROWS                     | 16                                                                                                   |
|   9 | AVG_ROW_LENGTH                 | 1024                                                                                                 |
|  10 | DATA_LENGTH                    | 16384                                                                                                |
|  11 | MAX_DATA_LENGTH                | 0                                                                                                    |
|  12 | INDEX_LENGTH                   | 16384                                                                                                |
|  13 | DATA_FREE                      | 0                                                                                                    |
|  14 | AUTO_INCREMENT                 | 18                                                                                                   |
|  15 | CREATE_TIME                    | 2022/08/17 14:20:33                                                                                  |
|  16 | UPDATE_TIME                    | 2022/08/18 16:04:46                                                                                  |
|  17 | CHECK_TIME                     |                                                                                                      |
|  18 | TABLE_COLLATION                | utf8_general_ci                                                                                      |
|  19 | CHECKSUM                       |                                                                                                      |
|  20 | CREATE_OPTIONS                 |                                                                                                      |
|  21 | TABLE_COMMENT                  |                                                                                                      |


