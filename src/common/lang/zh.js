module.exports = {
  navbar: {
    net: '网络选择 :',
    register: '注册',
    login: '登录',
    mainNet: '主网',
    testNet: '测试网',
    language: '语言选择：',
    cnName: 'CN',
    enName: 'EN',
    exit: '退出',
    returnToPrjectList: '返回项目列表',
    toSetting: '个人设置',
    help: '帮助中心',
    tutorial: '教程',
    feedback: '意见反馈',
    about: '关于我们',
    references: '参考模板',
    version: '测试版',
    introduce: 'One-stop ide for smart contract',
    support:'支持',
    lang:'CN',
    project:'项目'
  },
  language:{
    name:'EN'
  },
  home: {
    mainTxt: '-------------使用以下账号登录-------------',
    login: '点击登录',
    register: '注册ONT ID',
    smartXInfo_1:'本体网络上的一站式智能合约',
    smartXInfo_green:' IDE',
    smartXInfo_2:'',
  },
  register: {
    register: '注册ONT ID',
    generate: '生成ONT ID',
    recovery: '恢复ONT ID',
    enterPassword: '输入密码',
    enterPasswordAgain: '再次输入密码',
    waiting: '请等待',
    waitingInfo: '正在生成ONT ID，请等待...',
    registerWrong: '生成ONT ID失败！',
    pleaseCheck: '请重试。'
  },
  registerSuccess: {
    success : '注册成功',
    saveWallet: '请将你的加密ONT ID文件保存在安全的地方。',
    privateKey_1: '请确保没有人在看',
    privateKey_2: '并且周围没有相机',
    address: '3、这是您的地址。',
    download: '下载',
    next : '下一步',
    notice : '注意',
    info : '请确保您已经下载了ONT ID文件和备份了私钥。',
    go2Login : '去登录',
    cancel : '取消',
    saveFile:'1 保存ONT ID文件',
    savePrivateKey: '2 保存私钥',
    copy:'复制',
    display:'点击显示'
  },
  recovery: {
    recovery: '恢复ONT ID',
    privateKey: '私钥',
    enterPrivateKey: '输入私钥',
    enterPassword: '输入密码',
    enterPasswordAgain: '再次输入密码',
    waiting: '请等待',
    waitingInfo: '正在生成ONT ID，请等待...',
    recoveryWrong: '恢复ONT ID失败！',
    pleaseCheck: '请检查输入私钥是否正确。'
  },
  login: {
    login: '登录',
    open: '解锁',
    enterPassword: '输入密码',
    waiting: '请稍等',
    waitingInfo: '正在解锁，请稍等...',
    chooseFile: '选择文件',
    browse: '浏览',
    unlockWrong: '解锁失败请检查ONT ID文件和密码是否正确。',
    pleaseCheck: '请检查ONT ID文件和密码是否正确。',
    NOT_SUPPORTED_WALLET: '不支持的钱包文件。请重新注册使用。',
    INVALID_WALLET: '不正确的钱包格式。',
    signUp:'注册',
    thirdParty:'------------------- 第三方账号登录 -------------------',
    loginInfo_1:'忘记密码？',
    loginInfo_2:'点击这里恢复你的钱包',
  },
  githubLogin: {
    waiting: '正在登录，请等待....',
    returnToHome: '返回',
    homePage: '首页'
  },
  projectList:{
    createAndRun: '项目创建与运行',
    createProject: '创建项目',
    runProject: '运行项目',
    noProject:'暂无项目',
    Link: '链接',
    myProjectList: '我的项目列表',
    edit: '编辑',
    delete: '删除',
    cancel: '取消',
    waiting:'请稍等',
    waitingInfo: '正在加载项目列表，请稍等...',
    waitingDelete: '正在删除项目，请稍等...',
    notice:'请注意',
    noticeDelete:'您确定要永久删除该项目吗？',
    ok:'确定',
  },
  createSc: {
    chooseTemplate: '选择智能合约模板',
    pleaseSelect:'官网模板-请选择',
    autoTransfer: '自动转账',
    inputScName:'输入您的智能合约名称',
    scName:'智能合约名称',
    ok:'确定',
    waiting:'请等待',
    waitingInfo: '正在生成智能合约项目，请稍等...',
    errorForSelect: '请选择智能合约模板',
    null:'空模板',
    createProjectFail: '失败',
    createProjectFailInfo: '该项目名称已存在，请重新命名'
  },
  openABIFile:{
    inputScName:'输入您的智能合约名称',
    chooseAbiFile: '选择您的ABI文件',
    scName:'智能合约名称',
    abiFileName: 'ABI文件' ,
    inputLanguage: '选择您的智能合约语言',
    projectNameExist: '该项目名称已存在，请重新命名',
    openAbiFileFail:'打开ABI文件失败：文件格式不正确。',
    contractHashWrong:'打开ABI文件失败：合约哈希有误。'
  },
  selectLanguage: {
    pleaseSelect: '选择智能合约的编程语言'
  },
  searchProject: {
    loadSc: '加载智能合约',
    inputTxid: '输入合约TXID',
    openFile: '打开ABI文件',
    inputScName:'输入您的智能合约名称',
    scName:'智能合约名称',
    ok:'确定'
  },
  projectOperation: {
    compile: '编译',
    deploy: '部署',
    run: '运行',
    tool:'工具',
    test:'测试',
    restful:'接口',
    compileTooltips: '编译代码，生成ABI和AVM',
    deployTooltips: '将编译后的合约部署到链上',
    runTooltips: '运行合约方法'
  },
  compile: {
    compile: '编译',
    waiting: '编译中...',
    abi: 'ABI',
    outputInfo: 'AVM字节码',
    next: '下一步',
    name: '名称',
    value: '值',
    noData: '没有数据',
    copy: '复制',
    save: '保存',
    hash: '合约哈希：',
    entryPoint: '入口：',
    functionList: '方法列表：',
    compileTooltips: '编译代码，生成ABI和AVM',
    abiTooltips: 'ABI文件，包括代码编译后的哈希值和方法列表，可保存',
    nvmTooltips: 'AVM二进制编码，可复制',
    entrance:'入口：',
    methodsList: '方法列表',
    addABIFunction: '增加ABI方法列表',
    functionName: '方法名:',
    close: '关闭',
    add: '添加'
  },
  deploy: {
    selectWallet: '选择钱包文件',
    generateWallet:'生成钱包',
    walletInfo: '钱包信息',
    chooseFile: '选择文件',
    Browse: '浏览',
    enterPw: '输入密码',
    close: '关闭',
    unlock: '解锁',
    address: '地址：',
    asset: '资产：',
    payFee: '支付费用',
    info: '信息',
    name: '名称： ',
    version: '版本： ',
    author: '作者： ',
    email: '邮箱： ',
    desc: '说明： ',
    result: '结果',
    deploy: '部署',
    noData: '没有数据',
    betaTestAsset: '内测中，暂无',
    waiting: '部署中...',
    waitingUnlock: '解锁中...',
    deployed : '合约部署成功',
    errorTitle: '合约部署失败',
    errorCompile: '请先编译合约代码。',
    errorWallet: '请先选择您的钱包文件',
    errowWalletPassword:'您输入的钱包密码有误',
    infoTooltips: '合约信息',
    resultTooltips: '合约部署结果',
    preDeploy: '部署预执行',
    preDeploytips: '请先重新编译代码',
    emptyInfo: '请填写智能合约的每项信息。',
    generate:'生成',
    waitingGenerate:'生成中...'
  },
  run: {
    selectWallet: '选择钱包文件',
    generateWallet:'生成钱包',
    walletInfo: '钱包信息',
    chooseFile: '选择文件',
    Browse: '浏览',
    enterPw: '输入密码',
    close: '关闭',
    unlock: '解锁',
    address: '地址：',
    asset: '资产：',
    basicInfo: '基本信息',
    option: '选项',
    selectFuc: '选择运行函数： ',
    selectFucOption: '选择运行函数',
    run: '运行',
    contractName: '合约名称',
    txid: 'TXID',
    noData: '没有数据',
    tradingHash: '合约哈希： ',
    betaTestAsset: '内测中，暂无',
    payFee: '支付费用',
    waiting: '运行中...',
    waitingUnlock: '解锁中...',
    errorTitle: '运行失败',
    errorWallet: '请先选择您的钱包文件',
    errorFunction: '请选择一个需要运行的方法',
    noContractHash: '没有合约哈希。请先部署合约。',
    noFunction:'请添加需要运行的方法',
    function:'方法：',
    param:'参数：',
    preRun:'运行预执行',
    preRuntips: '使用预执行调用查询方法或者查询合约的gas limit。',
  },
  tool:{
    transform: '运行',
    clear:'清空'
  },
  test:{
    account:'账户',
    accountPrivateKey:'账户私钥：',
    accountAddress:'账户',
    ok:'确定',
    addAccount:'添加账户',
    editAccount:'编辑账户',
    errorPrivateKey:'私钥错误',
    errorPrivateKeyContent:'私钥输入错误，请重新输入',
    testFunction:'测试方法',
    selectAccount:'选择签名账户',
    addFunction:'添加方法',
    runThisFunc:'运行该方法',
    preRunThisFunc:'预运行该方法',
    multiSign:'多签(敬请期待）',
    function:'方法',
    selectNet:'选择运行网络：',
    mainNet:'主网',
    testNet:'测试网',
    privateNet:'私网',
    selectRunType:'选择运行方式：',
    run:'运行',
    preRun:'预执行',
    runError:'运行失败',
    download:'下载',
    save:'保存',
    edit:'编辑',
    cancel:'取消',
    delete:'删除',
    noAccountError_1:'请为方法',
    noAccountError_2:'选择签名账户',
    selectContractHash:'选择合约哈希:',
    currentContractHash:'当前合约哈希',
    Other:'其他',
    contractHashError:'您输入的合约哈希有误'
  },
  restful:{
    modelSuccessTitle:'运行结果',
    ok:'确定',
    waiting:'连接中...',
    errorTitle:'连接失败',
    errorContent:'连接失败，请检查网络',
    noValue:'请输入参数',
    send:'发送',
    privateNet:'Cyano网络：'
  },
  project: {
    event: '事件',
    logs: 'Logs',
    evaluationStack: 'Evaluation Stack',
    altStack: 'Alt Stack',
    history: 'History',
    locals: 'Locals',
    storage: 'Storage',
    continue: 'Continue (F9)',
    stop: 'Debug Stop',
    stepOverOpcode: 'Step Over Opcode (F7)',
    stepOverLine: 'Step Over Line (F8)',
    clearLogs: '清除',
    textFormat:'文本格式',
    wasmOutput:'Wasm输出'
  },
  setting:{
    title:'个人设置',
    ontid:'Ont Id 绑定',
    github:'Github 账户'
  },
  settingGithub:{
    title:'您当前账户绑定的 GitHub 账号为',
    noAccount:'您尚未绑定 Github 账号',
    removeBinding:'解除绑定',
    binding:'登陆Github并绑定',
    bindFalse:'绑定账户失败',
    accountExist:'该 Github 账户已存在，请选择其他账户进行绑定',
    ok:'确定'
  },
  settingOntId:{
    title:'您当前账户的 Ont ID 为',
    noAccount:'您尚未绑定 OntId',
    removeBinding:'解除绑定',
    binding:'绑定OntId',
    bindFalse:'绑定账户失败',
    accountExist:'该 OntId 账户已存在，请选择其他账户进行绑定',
    ok:'确定',
    chooseOntId:'选择 OntId 文件',
    bind:'绑定',
    wait:'等待中...'
  },
  ide:{
    annotation: 'CTRL+ALT+H可显示快捷键列表。',
    file: '文件',
    open: '打开...',
    save: '保存',
    fileWrong: '文件类型错误，无法打开',
    share: '分享到社交媒体',
    waiting: '请稍等',
    waitingInfo: '正在加载项目，请稍等...',
    editorPopover:'代码编辑区',
    editorPopoverInfo:'您可以在这里编辑智能合约代码，也可以导入已有的代码文件进行编辑。',
    operationPopover:'合约处理区',
    operationPopoverInfo:'您可以在这里选择对代码进行编译、部署和运行等操作，并可以查看到该合约的相关信息。',
    outputPopover:'日志打印区',
    outputPopoverInfo:'您对代码的编译、部署和运行结果将在这里显示。',
    noProvider: '没有安装插件。您可以从Chrome应用商店里安装Cyano wallet作为Provider。',
    noProviderAccount: '请先在Cyano wallet插件中生成钱包。',
    deployFalseInProvider: '部署失败，请检查钱包是否有足够的余额。',
  },
  projectEditor:{
    modifyWatTitle:'修改Wat内存值',
    close:'关闭',
    Modify: '修改',
    watMemory: 'Wat内存值:',
    modifyWatMemoryInfo: '修改Wat的内存值(修改后需重新编译）'
  },
  about:{
    title:'本体推出智能合约工具SmartX',
    content1:'智能合约的功能和应用前景已经被市场所认可，但其有着比较多的局限性。普通用户由于受到编程语言或者编程工具的限制，无法高效开发革命性的产品和服务，因此导致了应用场景开发者使用成本高昂。而SmartX正是为了解决这些问题应运而生。',
    content2:'SmartX是一个可用于编译，部署和调用智能合约的一站式IDE。它提供了丰富的智能合约模板以及强大的在线编辑器。基于SmartX这个工具，智能合约的需求方可以参考和使用模板合约，或者委托社区开发人员定制开发所需的合约。未来，智能合约的开发人员可以交易自己编写的智能合约，或者协作多人开发智能合约，利用自己的专业知识获得收益。',
    content3:'本体智能合约支持了Native智能合约、NeoVm智能合约、WASM智能合约等多种合约类型，目前，Smartx支持基于NeoVM的C＃和Python两种语言，未来还会支持WASM在线编译功能及更多主流开发语言，包括Java、Rust、Go、JavaScript等。',
    content4:'下一步，我们将像类似GitHub等分布式软件项目代码托管平台一样，支持多人共同参与、分享一份复杂的合约；并同时实施一套的经济激励措施，融入公正的治理政策，反映每一个参与者的贡献，使智能合约编写、智能合约交易、协作、社区建设等相结合，形成一个良好的智能合约开发生态。'
  },
}
