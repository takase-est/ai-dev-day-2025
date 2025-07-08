

# **アシスタントからエージェントへ：次世代AI駆動型ソフトウェア開発を習得するための3時間ワークショップ**

## **パート1：2025年の開発ワークフローの進化**

本セクションでは、このワークショップの目的を説明します。単に新しいツールを紹介するだけでなく、なぜこのトレーニングが競争力を維持するために必要であるかを説明します。

### **1.1. AI導入の現状と課題**

業界全体で、AIの導入が表面的なレベルに留まるという課題があります。2025年のBCG AI at Workレポートで指摘された「シリコンの天井」という概念は、現場の従業員による生成AIの利用が2023年以降、停滞している状況を示しています 1。データによれば、リーダーや管理職の72%が日常的にAIを利用している一方で、現場の開発者の利用率は51%に留まっており、これは経営層の期待と現場の実態との間にギャップがあることを示唆しています 1。

この問題は、BCGも指摘するように、「既存の働き方にAIツールを単に導入するだけでは、その潜在能力を十分に引き出すには不十分である」という点に関連しています 1。これは、GitHub Copilot Chatを導入しているものの、その活用が限定的であるという現状にも当てはまります。ツールを提供しても、実践的なトレーニングが不足しているため、チームの一部しかその価値を引き出せず、生産性の向上が期待通りに進まないという課題は多くの企業で見られます 3。

したがって、このワークショップは単なるツールトレーニングではなく、開発者の「ワークフロー」そのものを変えることに焦点を当てます。AIを応答ツールとして使う段階から、開発プロセス全体に統合されたパートナーとして活用する段階へと移行させることが、この「シリコンの天井」を越えるために重要です。

### **1.2. AIエージェントの登場と開発の変化**

ソフトウェア開発は、2023年の対話型AIから、2025年の自律型AIエージェントへと変化しています。AI SHIFT SUMMIT 2025のレポートで使われた「AIエージェント元年」という言葉は、このトレンドを示しています 4。この変化は、機能向上だけでなく、開発者とAIの関係性を変えるものです。

従来のCopilot Chatのようなツールは、ユーザーの指示に対して応答を返す受動的なものでした。しかし、AIエージェントは、高レベルの目標を理解し、自ら計画を立て、行動し、発生したエラーを自己修正する能力を持ち、自律的に動作します 5。この移行は、開発者がAIに「何をすべきか」を一行ずつ指示するのではなく、「何を達成したいか」という目標を委任する、という新しい協力関係を意味します。

この考え方の転換こそが、多くの開発チームが直面する課題の一つです。問題は技術的なスキル不足だけでなく、思考様式を変える必要がある点です。開発者は、自らを「ツールを使いこなす名人」と考える従来の考え方から、「エージェントにタスクを委任し、その成果を監督する協力者」という新しい考え方へと移行する必要があります。2025年のJSAIやGTCといった主要な国際会議でも、人間とAIの協調（Human-AI Teaming）やマルチエージェントシステム（MAS）、そして設計からレビューに至る開発ライフサイクル全体へのAI統合が主要テーマとして扱われており 5、このワークショップが業界のトレンドに沿ったものであることを示しています。

### **1.3. 何もしないことのリスク：新しい形の技術的負債**

エージェント型AIの導入が遅れることは、機会損失だけでなく、新たな「ワークフロー負債」を蓄積する可能性があります。競合他社がAIエージェントを活用して開発を加速し、品質を向上させ、コストを削減する一方で 11、古い働き方に留まるチームの相対的な生産性が低下する可能性があります。

多くの企業がAI導入の遅れによって、競争上の不利な状況に陥るリスクがあるという調査結果もあります 13。この状況を生む一般的な要因には、変化への抵抗、複雑さへの懸念、既存のワークフローを維持したいという慣性が含まれます 13。

このワークショップは、これらの内部的な障壁を乗り越えるための実践的な解決策として設計されています。3時間のハンズオンを通じて、チームは新しいツールを学ぶだけでなく、AIとの新しい協業スタイルを体感し、ワークフローを改善し、将来の競争力を高めるための一歩となります。

## **パート2：技術詳細：AIとの連携の仕組み**

本セクションでは、ワークショップの技術的な基盤を提供し、参加者がツールを使用する前に、その背後にある仕組みを理解できるようにします。

### **2.1. AIエージェントの仕組み：Copilot Agent Modeの解説**

CopilotのAgent Modeは、Copilot Chatとは異なる動作原理に基づいています。その特徴は、自律的にタスクを遂行する「エージェント・ループ」です。このプロセスにより、開発者はAIとの対話方法を変える必要があります 17。

1. **目標の取り込み (Goal Ingestion):** 開発者は自然言語で「APIエンドポイントを追加し、テストを書いてほしい」といった高レベルのタスクを与えます。  
2. **計画立案 (Planning):** エージェントはコードベース全体を分析し、タスクを達成するための複数ステップの計画を策定します。この計画はユーザーに提示され、透明性が確保されます 18。  
3. **実行（ツールの使用） (Execution & Tool Use):** エージェントは計画に基づき、ファイルの編集、ターミナルコマンドの実行（例：npm install、テストの実行）、情報の取得といった様々なツールを自律的に呼び出します 7。  
4. **監視と修正 (Monitoring & Remediation):** エージェントは、コンパイルエラーやテストの失敗といった実行結果を監視します。問題が検出されると、自ら計画を修正し、目標が達成されるまで繰り返し試行します 7。

このプロセスは「ブラックボックス」ではありません。開発者は常に「人間参加型（Human-in-the-Loop）」の制御を維持します。ツールの使用を承認する、変更内容をレビューして受け入れるか破棄するかを選択する、あるいはいつでも新しい指示を与えて軌道修正するなど、開発者が主導権を維持します 17。Agent Modeは、開発者を置き換えるのではなく、自律的なパートナーとして開発者を支援します。

### **2.2. コンテキストの活用：MCPによるエコシステム連携**

大規模言語モデル（LLM）だけでは、リアルタイムのドメイン固有知識や社内情報にアクセスできません。この「コンテキスト問題」を解決するのが、Model Context Protocol (MCP) です。MCPは、「AIにとってのLSP（Language Server Protocol）」とも言えるオープンスタンダードであり、AIエージェントと外部のデータソースやツールとの間で標準化された連携を可能にします 20。

MCPの利点は、AIエージェントを単なるコーダーから、プロジェクトのエコシステム全体を理解する、コンテキストを認識したデジタルチームメイトへと進化させる点にあります。GitHubのブログで紹介されているように、MCPは以下のようなワークフローを可能にします 21：

* **GitHub連携 (PR作成支援):** GitHubのMCPサーバーと連携し、コードの変更点や関連するIssueを分析して、プルリクエストの説明をインテリジェントに自動生成します。これにより、コラボレーションのプロセスが効率化されます 21。  
* **Playwright連携 (テスト自動化):** テストフレームワークであるPlaywrightと連携し、エージェントが自律的にテストを実行し、その結果を分析してコードを修正する、といった一連のワークフローをIDE内で完結させることができます 19。  
* **技術ドキュメント連携 (ナレッジ検索):** 社内の技術ドキュメントやナレッジベース（例：Markdownファイル、アーキテクチャ決定記録）をMCP経由で参照します。これにより、エージェントは過去の設計思想やチームのコーディング規約を理解した上で、文脈に沿ったコードを生成できます 20。

MCPを理解し活用することは、市販のAIツール（Copilot）を、貴社独自のツール、データ、ワークフローと深く統合し、競争優位性を高めるための鍵です。Visual Studio CodeがMCPを公式にサポートしていることは、この技術が今後の開発で重要になることを示しています 19。このワークショップでMCPを学ぶことは、ツール活用をさらに進めるための重要なステップです。

### **2.3. IDEの進化：AIネイティブプラットフォームとしてのVS Code**

このワークショップの環境としてVS Codeを選択することは、その方向性とエコシステムに基づいています。Microsoftが2025年にCopilot Chat拡張機能の主要コンポーネントをオープンソース化したことは、その一例です 23。この決定は、透明性を高め、コミュニティによる貢献を促進し、VS CodeをAI開発プラットフォームとしての位置づけを明確にしました。

さらに、VS CodeはGoCodeo、Tabnine、Keployといった多様なAI拡張機能があり、開発者は自身のワークフローに合わせて最適なツールを組み合わせることが可能です 。これにより、VS Codeは単なるエディタではなく、AIを活用した開発の中心的なツールとして機能します。本ワークショップは、このプラットフォームの能力を引き出すことを目指します。

## **パート3：AIエージェント・ワークショップ：3時間の実践計画**

これは、ワークショップ進行役のための実行計画です。20名の参加者が10組のペアで作業することを想定して構成されています。このワークショップでは、ペア内での協力に加え、ペア間の協力も推奨します。行き詰まった場合は、他のペアに声をかけ、助け合いながら進めてください。これにより、チーム全体のスキルアップが期待できます 5。

### **3.1. ワークショップの概要と目標**

* **主要目標:** 開発者を「プロンプト＆レスポンス」の思考様式から、AIエージェントとの「委任＆協調」ワークフローへと移行させる。  
* **副次目標:**  
  * GitHub Copilot Agent Modeを使った複数ステップのタスク遂行に関する実践的なスキルを習得する。  
  * Model Context Protocol (MCP) の目的と可能性を理解する。  
  * ペアプログラミング環境で、人間とAIの新しい協調的な力学を実践する。

#### **ワークショップ・タイムテーブル（180分）**

| 時間（分） | 所要時間 | モジュール | アクティビティ | チェックポイントと協力体制 | 主要な学習成果 |
| :---- | :---- | :---- | :---- | :---- | :---- |
| 0-15 | 15分 | 1\. 思考様式の転換とセットアップ | **プレゼンテーション:** エージェント的パラダイムシフト。目標の紹介。 | チーム間協力の推奨 | ワークショップの目的と、アシスタントからエージェントへの移行を理解する。 |
| 15-30 | 15分 | 1\. 思考様式の転換とセットアップ | **ガイド付きセットアップとペア結成:** Agent Modeの有効化、ペア結成、簡単なアイスブレイク。 | ペア結成と環境準備 | 環境の準備完了。ペアが基本的なコミュニケーションのリズムを確立する 5。 |
| 30-75 | 45分 | 2\. Agent Modeハンズオン | \*\*演習1：エージェントによるリファクタリング（ペアワーク）。\*\*単一プロンプトからの複数ファイルリファクタリング。 | **チェックポイント1:** 全ペアがリファクタリングを完了し、プロセスを理解していることを確認。完了したペアは他をサポート。 | エージェントの計画立案、複数ファイル編集、自律的な能力を体験する。 |
| 75-105 | 30分 | 2\. Agent Modeハンズオン | \*\*演習2：README駆動開発（ペアワーク）。\*\*仕様書ファイルから機能を構築する。 | **チェックポイント2:** 全ペアが新機能とテストを生成し、テストが成功することを確認。ペア間でのデバッグ協力を推奨。 | コンテキストの注入（\#file）と、テストと修正のループが実際に機能する様子を学ぶ。 |
| 105-120 | 15分 | 3\. MCPとの接続 | **プレゼンテーション:** MCPとは何か？ 企業の頭脳への架け橋。 | \- | AIを外部の専有データに接続する戦略的重要性を把握する。 |
| 120-165 | 45分 | 3\. MCPとの接続 | \*\*演習3：コンテキストを認識するエージェント（ペアワーク）。\*\*事前設定されたMCPサーバーを使用してタスクを完了する。 | **チェックポイント3:** 全ペアがMCP経由で情報を取得し、コードを更新できていることを確認。技術的な問題を全体で共有・解決。 | エージェントが外部コンテキストを使用してより良い意思決定を行う力を目の当たりにする。 |
| 165-180 | 15分 | 4\. 統合と戦略的な次のステップ | **グループディスカッションと振り返り:** 学びや課題の共有。スプリントへの統合について議論。 | チーム協力の経験を共有 | 学びを定着させ、実世界での応用に向けた次のステップを特定する。 |

### **3.2. モジュール1：思考様式の転換とセットアップ（30分）**

* **プレゼンテーション（15分）:** パート1の主要なポイントを用いて、考え方の変化を説明します。コードを一行ずつ書くことから、目標を定義し結果をレビューすることへの移行を強調します。  
* **ガイド付きセットアップ（15分）:** VS CodeでAgent Modeを有効にするためのチェックリストを提供します 25。ペアの結成を促します。アイスブレイクとして、「ペアで、自動化したい反復的なコーディングタスクを1つ話し合ってください」という簡単な1分間のタスクを設定します。これはワークショップのテーマに沿っており、参加者間の対話を促進します 10。

### **3.3. モジュール2：Copilot Agent Modeハンズオン（75分）**

* **演習1：エージェントによるリファクタリング（45分）**  
  * **タスク:** 各ペアには、機能はするものの構造が整理されていない、複数ファイル（例：3〜4ファイル）からなる小規模なNode.jsまたはPythonアプリケーションが与えられます。Agent Modeへのプロンプトは次の通りです：「このアプリケーションをリファクタリングしてください。コアロジックをAPIルートから分離し、すべての関数が適切なファイルに配置されるようにし、プロジェクト全体で変数名を分かりやすく改善してください。」  
  * **プロセス:** ペアはこのプロンプトを発行し、エージェントが提案する計画をレビューし、ステップを承認し、最終的に複数ファイルにまたがる変更結果を確認します。これにより、エージェントがコードベース全体を横断して推論する能力を確認できます 。  
  * **【チェックポイント1】**  
    * **達成目標:** 全てのペアが、エージェントによる複数ファイルのリファクタリングを完了し、生成された計画と変更内容を確認・承認するプロセスを体験している。  
    * **進行方法:** 進行役は各ペアの進捗を確認します。完了したペアは、まだ作業中のペアをサポートしてください。この時点での目標は、全ペアが足並みを揃えて次のステップに進むことです。  
* **演習2：README駆動開発（30分）**  
  * **タスク:** リファクタリングされたコードを基に、ペアはspec.mdというファイルを作成します。プロンプトは次の通りです：「\#spec.md の仕様に基づいて、'/status' という新しいAPIエンドポイントを追加してください。このエンドポイントは 'status: ok' と現在のサーバー時刻を含むJSONオブジェクトを返す必要があります。また、新しいテストファイルを作成し、このエンドポイントの機能を検証する基本的なテストを記述してください。テストを実行してパスすることを確認してください。」  
  * **プロセス:** この演習では、\#fileを用いた明示的なコンテキストの注入方法を学びます。また、エージェントが新しいファイルの作成、コードの記述、テストの記述、そしてその実行までを行うことで、「テストと修正」のループを体験します 26。  
  * **【チェックポイント2】**  
    * **達成目標:** 全てのペアが、\#fileコンテキストを使用して仕様書から新機能とテストを生成し、テストが成功することを確認している。  
    * **進行方法:** 進行役は再度、全ペアの完了を確認します。特にテスト実行でエラーが出ているペアがいないかを確認し、必要に応じてペア間でのデバッグ協力を促します 6。

### **3.4. モジュール3：MCPで実世界と接続する（60分）**

* **プレゼンテーション（15分）:** LSPとの類推を用いてMCPを説明し、エージェントが外部ツールに接続する仕組みを図で示します 27。  
* **演習3：コンテキストを認識するエージェント（45分）**  
  * **セットアップ:** 進行役は、事前に準備された簡単なMCPサーバー（例：技術ドキュメントの抜粋を公開するローカルサーバー）を設定する方法を指示します。  
  * **タスク:** プロンプトは次の通りです：「'tech-docs' ツールを使用して、私たちのAPIのレートリミットに関するポリシーを検索してください。その情報に基づいて、新しいAPIエンドポイントに適切なレートリミット処理を追加してください。」  
  * **プロセス:** エージェントはMCPツールを使ってレートリミット情報を取得し、それをコードに適用します。これにより、AIがコードベース内に存在しない情報にアクセスするという具体的な体験ができ、MCPの価値を参加者は実感できます 21。  
  * **【チェックポイント3】**  
    * **達成目標:** 全てのペアが、事前設定されたMCPサーバーから外部コンテキスト（技術ドキュメント）を取得し、それを用いてコードを正しく更新できている。  
    * **進行方法:** これが最後のハンズオン演習です。進行役は、全ペアがMCPの概念とその実践的な価値を体験できたかを確認します。技術的な問題で詰まっているペアがいれば、全体で解決策を共有することも有効です。

このペアプログラミング形式は、人間同士の知識共有のためだけではありません。AIエージェントが「ドライバー」としてコーディングを実行し、人間が「ナビゲーター」や「アーキテクト」の役割を担う新しい協業モデルを体験する場となります 26。2人の人間が1つのAIエージェントを共同で指揮することにより、高レベルの指示について議論し、合意形成するプロセスを体験します。これは、人間とAIの協調に関する研究で示されているように、将来のチーム開発ワークフローを想定したものであり、学習効果を高めます 5。

### **3.5. モジュール4：統合と戦略的な次のステップ（15分）**

* **グループディスカッション:** 「最も驚いたことは？」「最も挑戦的だったことは？」「次のスプリントでこれをどのように使えるか？」「各チェックポイントで、他のペアと協力して解決した課題はありましたか？」といった簡単な振り返りの形式で議論を促します。  
* **進行役のガイダンス:** 「次にバグチケットを受け取ったら、まずエージェントに失敗するテストを書かせるプロンプトから始めてみましょう」といった、具体的な始め方の例を提示します。

## **パート4：ワークショップからワークフローへ：AI統合のためのロードマップ**

この最終セクションでは、ワークショップの効果を持続させ、生産性向上に繋げるための戦略を提案します。

### **4.1. 継続的な導入の促進**

一度きりのトレーニングで終わらせないためには、継続的な取り組みが重要です。多くのAIイニシアチブがパイロット段階で停滞する状況を回避し 、現場の利用が停滞する「シリコンの天井」を乗り越えるためには、組織的な支援が有効です 1。

具体的な戦略として、以下を推奨します。

* **ナレッジ共有の場の創設:** プロンプトや成功事例を共有するための専用のSlack/Teamsチャンネルを設立します。  
* **成功体験の共有:** スプリントレビューで「AI駆動開発」の短いデモを行う時間を設けます。  
* **AI推進者の育成:** ワークショップ参加者の中から「AI推進者」を指名し、他のメンバーのサポート役を担ってもらいます。

これらの活動は、リーダーシップの支援と継続的なトレーニングがAI導入の成功に重要であるという調査結果とも一致しており、チーム全体のスキルと士気を高める上で効果的です。

### **4.2. 開発者の役割の変化**

AIエージェントが実装の多くを担うようになると、開発者の役割は上流の工程へと変化します。コードを書く時間から、設計やレビューの時間へと比重が移ります。この新しい役割において重要となるスキルは以下の通りです。

* **アーキテクチャ設計と問題の分解:** 複雑なビジネス要件を、エージェントが実行可能な一連の目標へと分解する能力。  
* **専門的なレビュー:** AIが生成したコードを、セキュリティ、パフォーマンス、ビジネスロジックとの整合性という観点から評価する能力 。  
* **プロンプトエンジニアリングとコンテキストの提供:** エージェントのパフォーマンスを最大限に引き出すために、適切なコンテキスト（仕様書、既存コード、設計思想など）を提供するスキル 。

開発者の役割は、「実装者」から、AIを活用し、成果物の品質を管理する「技術監督者」のような役割へと変化していきます。

### **4.3. 成功を測定するためのフレームワーク**

ワークショップの効果を測定するため、導入後の進捗を追跡するための指標を提案します。これにより、トレーニングの成果を、定量的・定性的なデータとして評価することができます。これは、ROIを重視するアプローチです 。

#### **ワークショップ後の導入戦略とKPI**

| KPIカテゴリ | 指標 | 測定方法 | 目標/ゴール | 関連資料 |
| :---- | :---- | :---- | :---- | :---- |
| **導入と利用** | 週に1回以上Agent Modeを使用する開発者の割合 | IDEのテレメトリ（利用可能な場合）または専用チャンネルでの週次アンケート | 1ヶ月以内に50%、3ヶ月以内に75%の導入率を達成する | 1 |
| **生産性** | 標準的なタスク（例：新規エンドポイント作成、リファクタリング）の完了時間 | A/Bテストまたは特定のチケットに対する開発者の自己申告（例：「エージェント使用による時間節約：2時間」） | 対象タスクタイプの平均時間を1四半期で20%削減する | 8 |
| **コード品質** | AI支援タスクのPRにおけるコメント/修正の数 | PRデータを分析。単純なタスクでのやり取りの減少は、初期品質の向上を示唆する可能性がある | エージェント開発に適したタスクのPRにおけるコメント対コード比率を減少させる | 4 |
| **開発者スキル** | 複雑な複数ファイル変更に取り組む自信（自己評価） | ワークショップ前後のアンケート（1〜5段階評価） | 平均自信度スコアを2.5から4.0に向上させる | 1 |
| **チームコラボレーション** | チームのナレッジベースで共有されたプロンプト/ワークフローの数 | 指定されたConfluence/NotionページやSlackチャンネルでの共有成果物の数 | スプリントごとに少なくとも1つの新しい共有ワークフローが文書化される | 5 |

このフレームワークを通じて、ワークショップの効果を継続的に測定し、改善していくことで、AIエージェントの導入を、組織全体の生産性と競争力を向上させる戦略的な取り組みへと繋げることが可能になります。

#### **引用文献**

1. BCG's AI at Work 2025 report: Four takeaways for HR leaders | UNLEASH, 7月 6, 2025にアクセス、 [https://www.unleash.ai/artificial-intelligence/bcgs-ai-at-work-2025-report-four-takeaways-for-hr-leaders/](https://www.unleash.ai/artificial-intelligence/bcgs-ai-at-work-2025-report-four-takeaways-for-hr-leaders/)  
2. AI at Work 2025: Momentum Builds, but Gaps Remain | BCG \- Boston Consulting Group, 7月 6, 2025にアクセス、 [https://www.bcg.com/publications/2025/ai-at-work-momentum-builds-but-gaps-remain](https://www.bcg.com/publications/2025/ai-at-work-momentum-builds-but-gaps-remain)  
3. Devin徹底検証！生成AIを実務に落とし込むAIワークショップ ... \- note, 7月 6, 2025にアクセス、 [https://note.com/spice\_factory/n/n018c4052b298](https://note.com/spice_factory/n/n018c4052b298)  
4. 「AI SHIFT SUMMIT 2025」レポート 企業の最前線に見るAIエージェント実装の今 \- AIsmiley, 7月 6, 2025にアクセス、 [https://aismiley.co.jp/ai\_news/ai-shift-summit-2025-ai-agent/](https://aismiley.co.jp/ai_news/ai-shift-summit-2025-ai-agent/)  
5. Developments in AI Agents: Q1 2025 Landscape Analysis, 7月 6, 2025にアクセス、 [https://www.ml-science.com/blog/2025/4/17/developments-in-ai-agents-q1-2025-landscape-analysis](https://www.ml-science.com/blog/2025/4/17/developments-in-ai-agents-q1-2025-landscape-analysis)  
6. docs.github.com, 7月 6, 2025にアクセス、 [https://docs.github.com/en/copilot/get-started/github-copilot-features\#:\~:text=Use%20agent%20mode%20when%20you,the%20original%20task%20is%20complete.](https://docs.github.com/en/copilot/get-started/github-copilot-features#:~:text=Use%20agent%20mode%20when%20you,the%20original%20task%20is%20complete.)  
7. Use Copilot agent mode \- Visual Studio \- Learn Microsoft, 7月 6, 2025にアクセス、 [https://learn.microsoft.com/en-us/visualstudio/ide/copilot-agent-mode?view=vs-2022](https://learn.microsoft.com/en-us/visualstudio/ide/copilot-agent-mode?view=vs-2022)  
8. JSAI2025参加レポート / 開発者向けブログ・イベント | GMO Developers, 7月 6, 2025にアクセス、 [https://developers.gmo.jp/technology/65154/](https://developers.gmo.jp/technology/65154/)  
9. イベントレポート一覧｜GTC Insight, 7月 6, 2025にアクセス、 [https://gtc.ask-corp.jp/event](https://gtc.ask-corp.jp/event)  
10. Polaris.AI / JSAI2025 参加レポート \- Zenn, 7月 6, 2025にアクセス、 [https://zenn.dev/polarisai\_blog/articles/3c49b706884f49](https://zenn.dev/polarisai_blog/articles/3c49b706884f49)  
11. 【2025年最新版】ソフトウェア開発におけるAI活用術｜事例・メリット・おすすめツールを完全解説！, 7月 6, 2025にアクセス、 [https://nocoderi.co.jp/2025/04/05/%E3%80%902025%E5%B9%B4%E6%9C%80%E6%96%B0%E7%89%88%E3%80%91%E3%82%BD%E3%83%95%E3%83%88%E3%82%A6%E3%82%A7%E3%82%A2%E9%96%8B%E7%99%BA%E3%81%AB%E3%81%8A%E3%81%91%E3%82%8Bai%E6%B4%BB%E7%94%A8%E8%A1%93/](https://nocoderi.co.jp/2025/04/05/%E3%80%902025%E5%B9%B4%E6%9C%80%E6%96%B0%E7%89%88%E3%80%91%E3%82%BD%E3%83%95%E3%83%88%E3%82%A6%E3%82%A7%E3%82%A2%E9%96%8B%E7%99%BA%E3%81%AB%E3%81%8A%E3%81%91%E3%82%8Bai%E6%B4%BB%E7%94%A8%E8%A1%93/)  
12. AIエージェントの革新：生成 AI技術の限界を超えて \- Fujitsu, 7月 6, 2025にアクセス、 [https://global.fujitsu/-/media/Project/Fujitsu/Fujitsu-HQ/technology/key-technologies/news/ta-ai-agent-innovation-20250328/ta-ai-agent-innovation-20250328-jp.pdf?rev=469155cc91854ef2b43cb02fd86e2cdb\&hash=EBC098F2424B989D689224A366273BB8](https://global.fujitsu/-/media/Project/Fujitsu/Fujitsu-HQ/technology/key-technologies/news/ta-ai-agent-innovation-20250328/ta-ai-agent-innovation-20250328-jp.pdf?rev=469155cc91854ef2b43cb02fd86e2cdb&hash=EBC098F2424B989D689224A366273BB8)  
13. Navigating the AI landscape in SMEs: Overcoming internal challenges and external obstacles for effective integration | PLOS One, 7月 6, 2025にアクセス、 [https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0323249](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0323249)  
14. Study reveals high AI adoption in manufacturing sector \- CohnReznick, 7月 6, 2025にアクセス、 [https://www.cohnreznick.com/insights/manufacturing-checkup-artificial-intelligence](https://www.cohnreznick.com/insights/manufacturing-checkup-artificial-intelligence)  
15. AI Adoption in Traditional Industries: Why Delaying Could Be a Costly Mistake, 7月 6, 2025にアクセス、 [https://www.sophialeeinsights.com/post/ai-adoption-in-traditional-industries-why-delaying-could-be-a-costly-mistake](https://www.sophialeeinsights.com/post/ai-adoption-in-traditional-industries-why-delaying-could-be-a-costly-mistake)  
16. 企業のAI活用における失敗事例6選｜Shin | 代表社員@DigDaTech Inc. \- note, 7月 6, 2025にアクセス、 [https://note.com/\_sintaro0221\_/n/nff20aa156cf5](https://note.com/_sintaro0221_/n/nff20aa156cf5)  
17. Introducing GitHub Copilot agent mode (preview) \- Visual Studio Code, 7月 6, 2025にアクセス、 [https://code.visualstudio.com/blogs/2025/02/24/introducing-copilot-agent-mode](https://code.visualstudio.com/blogs/2025/02/24/introducing-copilot-agent-mode)  
18. How to Use VS Code Agent Mode for Beginners \- Apidog, 7月 6, 2025にアクセス、 [https://apidog.com/blog/vscode-agent-mode/](https://apidog.com/blog/vscode-agent-mode/)  
19. Agent mode: available to all users and supports MCP \- Visual Studio Code, 7月 6, 2025にアクセス、 [https://code.visualstudio.com/blogs/2025/04/07/agentMode](https://code.visualstudio.com/blogs/2025/04/07/agentMode)  
20. What the heck is MCP and why is everyone talking about it? \- The GitHub Blog, 7月 6, 2025にアクセス、 [https://github.blog/ai-and-ml/llms/what-the-heck-is-mcp-and-why-is-everyone-talking-about-it/](https://github.blog/ai-and-ml/llms/what-the-heck-is-mcp-and-why-is-everyone-talking-about-it/)  
21. 5 ways to transform your workflow using GitHub Copilot and MCP ..., 7月 6, 2025にアクセス、 [https://github.blog/ai-and-ml/github-copilot/5-ways-to-transform-your-workflow-using-github-copilot-and-mcp/](https://github.blog/ai-and-ml/github-copilot/5-ways-to-transform-your-workflow-using-github-copilot-and-mcp/)  
22. Agent mode is now generally available with MCP tools support in Visual Studio, 7月 6, 2025にアクセス、 [https://github.blog/changelog/2025-06-17-visual-studio-17-14-june-release/](https://github.blog/changelog/2025-06-17-visual-studio-17-14-june-release/)  
23. VS Code Goes Transparent as Open-Source AI Editor \- Visual Studio Magazine, 7月 6, 2025にアクセス、 [https://visualstudiomagazine.com/articles/2025/06/30/vs-code-goes-transparent-as-open-source-ai-editor.aspx](https://visualstudiomagazine.com/articles/2025/06/30/vs-code-goes-transparent-as-open-source-ai-editor.aspx)  
24. What This Means for Developers and the Future of AI in VS Code | by Aziz Banihashemi, 7月 6, 2025にアクセス、 [https://medium.com/@azizbanihashemi/what-this-means-for-developers-and-the-future-of-ai-in-vs-code-fa961f4e9181](https://medium.com/@azizbanihashemi/what-this-means-for-developers-and-the-future-of-ai-in-vs-code-fa961f4e9181)  
25. Top 5 AI-Powered VS Code Extensions for Coding & Testing in 2025 | Keploy Blog, 7月 6, 2025にアクセス、 [https://keploy.io/blog/community/top-5-ai-powered-vs-code-extensions-for-coding-testing-in-2025](https://keploy.io/blog/community/top-5-ai-powered-vs-code-extensions-for-coding-testing-in-2025)  
26. AWS Prescriptive Guidance \- Maturity model for adopting generative AI on AWS \- AWS Documentation, 7月 6, 2025にアクセス、 [https://docs.aws.amazon.com/pdfs/prescriptive-guidance/latest/strategy-gen-ai-maturity-model/strategy-gen-ai-maturity-model.pdf](https://docs.aws.amazon.com/pdfs/prescriptive-guidance/latest/strategy-gen-ai-maturity-model/strategy-gen-ai-maturity-model.pdf)  
27. Common RAG challenges in the wild and how to solve them | by The Educative Team, 7月 6, 2025にアクセス、 [https://learningdaily.dev/common-rag-challenges-in-the-wild-and-how-to-solve-them-5713bd7ad35c](https://learningdaily.dev/common-rag-challenges-in-the-wild-and-how-to-solve-them-5713bd7ad35c)  
28. AI ROI: How to Measure and Maximize Your Return on Investment in Artificial Intelligence | SmartDev, 7月 6, 2025にアクセス、 [https://smartdev.com/ai-return-on-investment-roi-unlocking-the-true-value-of-artificial-intelligence-for-your-business/](https://smartdev.com/ai-return-on-investment-roi-unlocking-the-true-value-of-artificial-intelligence-for-your-business/)  
29. Who Wins The Agentic AI Software Development Race? \- The Futurum Group, 7月 6, 2025にアクセス、 [https://futurumgroup.com/press-release/who-wins-the-agentic-ai-software-development-race/](https://futurumgroup.com/press-release/who-wins-the-agentic-ai-software-development-race/)