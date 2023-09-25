# Devices Management

## Docker コンテナ一覧

| Name        | Port(Ext) | Port(Int) | Description        |
| :---------- | :-------- | :-------- | :----------------- |
| phpmyadmain | 3000      | 80        | DB Management tool |
| mysql       | 3306      | 3306      | Database           |
| node        | 8080      | 8080      | API Server         |

## CLI（コマンド一覧）

※Windows 環境の場合、コマンド名の先頭に`winpty`を付けてください

| コマンド             | 説明                           |
| -------------------- | ------------------------------ |
| docker-compose up    | コンテナを起動                 |
| docker-compose up -d | コンテナをバックグラウンド起動 |
| docker-compose down  | コンテナを停止                 |
| docker-compose logs  | コンテナのログを確認           |

## API ルーティング

| Name              | Route                       | HTTP   | Description        |
| :---------------- | :-------------------------- | :----- | :----------------- |
| loginUser         | /api/httpmanage/login       | POST   | ユーザログイン認証 |
| logoutUser        | /api/httpmanage/logout      | POST   | ユーザログアウト   |
| getDevicesByQuery | /api/httpmanage/devices     | GET    | デバイス一覧取得   |
| postDevices       | /api/httpmanage/devices     | POST   | デバイス作成       |
| getDevicesByPath  | /api/httpmanage/devices/:id | GET    | デバイス個別取得   |
| putDevice         | /api/httpmanage/devices/:id | PUT    | デバイス編集       |
| deleteDevice      | /api/httpmanage/devices/:id | DELETE | デバイス削除       |

## 関連資料

- [API 仕様書](./docs/API仕様書.html)
- [DB 定義書：users](./docs/DB/managementdb.users.md)
- [DB 定義書：devices](./docs/DB/managementdb.devices.md)
