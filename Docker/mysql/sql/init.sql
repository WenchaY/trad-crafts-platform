CREATE DATABASE TraditionalCraftDB;
use TraditionalCraftDB;

CREATE TABLE users (
  uid int(10) unsigned not null auto_increment comment 'ユーザ　ID', 
  account varchar(255) not null comment 'ユーザ　システムロクインアカウント', 
  password varchar(255) not null comment 'ユーザ　システムパスワード', 
  nickname varchar(255) comment 'ユーザ　ニックネーム',
  created_at timestamp not null default current_timestamp comment 'ユーザ　作成時刻', 
  updated_at timestamp not null default current_timestamp on update current_timestamp comment 'ユーザ　更新時刻',
  is_deleted boolean not null default false comment 'ユーザ　削除フラグ',
  PRIMARY KEY (uid)
)
comment = 'ユーザ情報';

CREATE TABLE craft_location (
  craft_id int(10) unsigned not null auto_increment comment '工芸品　ID',
  name varchar(255) not null comment '工芸品　名前',
  japanese_name varchar(255) comment '工芸品　日本語名前',
  url varchar(255) comment '工芸品　説明文URL',
  created_at timestamp not null default current_timestamp comment '工芸品　作成時刻', 
  updated_at timestamp not null default current_timestamp on update current_timestamp comment '工芸品　更新時刻',
  is_deleted boolean not null default false comment '工芸品　削除フラグ',
  PRIMARY KEY (craft_id)
)
comment = '工芸品情報';

CREATE TABLE craft_characteristic (
  id int(10) unsigned not null auto_increment comment 'ID',
  craft_id int(10) unsigned not null comment '工芸品　ID',
  description TEXT comment '特徴語　説明文',
  region varchar(255) comment '特徴語　地域',
  category varchar(255) comment '特徴語　品類',
  material varchar(255) comment '特徴語　材質',
  atmosphere varchar(255) comment '特徴語　雰囲気',
  manufacturing varchar(255) comment '特徴語　製作工程',
  era varchar(255) comment '特徴語　年代', 
  created_at timestamp not null default current_timestamp comment '特徴語　作成時刻', 
  updated_at timestamp not null default current_timestamp on update current_timestamp comment '特徴語　更新時刻',
  is_deleted boolean not null default false comment '特徴語　削除フラグ',
  PRIMARY KEY (id),
  FOREIGN KEY(craft_id) REFERENCES craft_location(craft_id)
)
comment = '工芸品特徴語';
