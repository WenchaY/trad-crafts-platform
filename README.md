# Traditional Crafts Platform

## API仕様書
### Build手順
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

## Docker コンテナ一覧

| Name        | Port(Ext) | Port(Int) | Description        |
| :---------- | :-------- | :-------- | :----------------- |
| phpmyadmain | 3000      | 80        | DB Management tool |
| mysql       | 3306      | 3306      | Database           |
| python      | 8080      | 8080      | API Server         |

## CLI（コマンド一覧）

※Windows 環境の場合、コマンド名の先頭に`winpty`を付けてください

| コマンド             | 説明                           |
| -------------------- | ------------------------------ |
| docker-compose up    | コンテナを起動                 |
| docker-compose up -d | コンテナをバックグラウンド起動 |
| docker-compose down  | コンテナを停止                 |
| docker-compose logs  | コンテナのログを確認           |

## API ルーティング

**Coming Soon**

## 関連資料

