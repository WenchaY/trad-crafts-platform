# Traditional Crafts Platform

- [Traditional Crafts Platform](#traditional-crafts-platform)
  - [Docker コンテナ一覧](#docker-コンテナ一覧)
  - [CLI コマンド一覧](#cli-コマンド一覧)
  - [API Server](#api-server)
    - [Routing Info](#routing-info)
      - [Users](#users)
      - [Crafts](#crafts)
    - [API 仕様書](#api-仕様書)
      - [Build 手順](#build-手順)
    - [Import a package](#import-a-package)
  - [関連資料](#関連資料)
      - [問題解決まとめ](#問題解決まとめ)

## Docker コンテナ一覧

| Name        | Port(Ext) | Port(Int) | Description        |
| :---------- | :-------- | :-------- | :----------------- |
| phpmyadmain | 8080      | 80        | DB Management tool |
| mysql       | 3306      | 3306      | Database           |
| python      | 3000      | 3000      | API Server         |

## CLI コマンド一覧

※Windows 環境の場合、コマンド名の先頭に`winpty`を付けてください

| コマンド             | 説明                           |
| -------------------- | ------------------------------ |
| docker-compose up    | コンテナを起動                 |
| docker-compose up -d | コンテナをバックグラウンド起動 |
| docker-compose down  | コンテナを停止                 |
| docker-compose logs  | コンテナのログを確認           |

## API Server

### Routing Info

#### Users

| Name             | Route                | HTTP   | Description                  |
| :--------------- | :------------------- | :----- | :--------------------------- |
| Register         | /api/users           | POST   | ユーザー登録                 |
| ChangePassword   | /api/users           | PUT    | パスワード変更               |
| Login            | /api/users/login     | POST   | ユーザーログイン認証         |
| GetUserByAccount | /api/users/{account} | GET    | アカウントでユーザー情報取得 |
| GetUserByUid     | /api/users/:uid      | GET    | UID でユーザー情報取得       |
| Delete           | /api/users/:uid      | DELETE | ユーザー削除                 |
| ChangeNickname   | /api/users/name      | PUT    | ニックネーム変更             |

#### Crafts

Coming Soon...

### API 仕様書

#### Build 手順

1. `Node`をインストール
2. 以下のコマンドで`Node`のインストール状態を確認
   ```bash
     $ npm -v
     9.x.x
   ```
3. 以下のコマンドで`redoc`をインストール
   ```bash
     $ npm install -g redoc-cli
   ```
4. 以下のコマンドで`API仕様書`をビルドする
   ```bash
     $ pwd
     ~/trad-crafts-platform
     $ redoc-cli bundle ./docs/api-spec.yml --output ./docs/build/api-spec.html
   ```
5. ビルド状態を確認
   ```bash
     $ ls ./docs/build/
     api-spec.html
   ```

### Import a package

1. API サーバー Terminal を起動

   ```bash
   $ docker-compose run api-server bash
   root@xxxx:/api-server#
   ```

2. Import a package

   ```bash
   $ poetry add package_name
   ```

3. Docker コンテナを再起動

   ```bash
   $ docker-compose down
   $ docker-compose up -d
   ```

## 関連資料

#### 問題解決まとめ
**[How-to-Fix-It](./How-to-Fix-It.md)**
