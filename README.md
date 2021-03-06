# EarlyBird（アプリ解説編）

技術選定・実装振り返り編は[こちら](https://github.com/kazuki0122/api)。

## アプリについて

### アプリ概要

本アプリは、寝坊防止アプリです。友達同士でグループを作り、起床時間と起きれなかった際の罰金額を決めます。  
設定した起床時間から30分の間にグループにいる全員がメッセージを送信した場合は課金は発生しませんが、一人でもメッセージを送れないと全員課金されるようになっています。  

### URL

[https://early-bird0122.netlify.app/](https://early-bird0122.netlify.app/)

### テスト用アカウント

email：test@test.com  
password：111111

## アプリ詳細

### 作成動機

私には前職で朝活を一緒にやる友人がいました。その友人も私も夜型人間で、中々朝起きれずにいました。  
そこでいつもの朝活に罰則をつけて緊張感を持たせるようにしました。  
具体的には、朝活の開始時間までに連絡をし、時間までに連絡がなければ、相手にコーヒ代を奢るということをやっていました。  
こういった罰則をつけることで苦手だった朝も次第に起きれるようになりました。  
また、私たち以外にも、罰則をつけて朝活をしている人達が何人かいた為、朝起きれないことを悩みにしてる人は多いのではないかと思いました。  
実際に、寝坊防止アプリで同じようなものがないか確認して見ましたが、個人にフォーカスされたアプリがほとんどで、複数人で使うアプリは存在していなかったため今回実装することに致しました。  


### 本アプリの使い方

ユーザーの登録をします。その際にクレジットカードも登録します。  
次にグループを作成するために友達を追加します。  
ヘッダーのメニューを開き、ユーザー一覧を表示します。  
アプリに登録してるユーザー一覧が見れるのでそこから友達申請をします。
次に、友達を招待してグループを作成します。  
招待された友達は招待されたグループに入室します。  
グループの中で、起きる時間と罰金額を設定します。  
グループ内にある設定時間の確認というボタンを押すと、設定時間と罰金額が表示されます。  
設定した起きる時間から30分の間にグループ内でメッセージを送ります。全員が30分の間に送れば罰金は発生しませんが、一人でもメッセージを送れなかった場合全員罰金を支払うことになります。  
また、ユーザーが起きれたかどうかはバッチ処理を使って決まった時刻に判定しています。
