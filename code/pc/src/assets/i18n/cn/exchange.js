export default {
    assets: "资产",
    exchange: "现货交易",
    // crypto: '币币合约',
    perpetualSwap: '永续合约',
    forex: '外汇合约',

    contact_us: "联系我们",
    support: "帮助中心",
    login: "登 录",
    register: "注 册",

    asset: "资产",
    account_exc: "现货账户",
    recharge: "(存币&提币)",
    account_con: "合约账户",

    transfer: "资金划转",
    fund: "充值记录",
    orders: "委托",

    exchange_orders: "现货委托",
    contract_orders: "合约委托",
    T1: "T1 未验证",
    T2: "T2 已验证",
    T3: "T3 已验证",
    commission: "最高30%邀请返佣",
    security: "账户&安全",

    logout: "退出登录",

    'help1': `Crypto FX Contract Guide`,
    'help2': `Contract Specifications`,

    search: "搜索",
    fav: '自选',
    pair: '交易对',
    price: '价格',

    change: '24h涨跌幅',
    high: '24h最高价',
    low: '24h最低价',
    last: '最新价格',
    volume: '24h成交量',

    PriceUsdt: '价格',
    qty: '数量',
    total: '总值',

    buy: '买入',
    sell: '卖出',

    orderType: '委托类型',
    triggerPrice: '触发价格',
    limitPrice: '限价价格',

    amount: '数量',
    orderTotal: '委托总值',

    available: '可用余额',
    enterAmount: '请输入数量',
    enterTotal: '请输入总价',
    enterPrice: '请输入价格',
    enterTrigger: '请输入触发价格',

    bestPrice: '在最佳市场价格成交',

    markets: '最新成交',

    time: '时间',

    opens: '当前委托',
    histories: '委托记录',

    more: '查看更多',
    conditions: '条件委托',
    notice: '提示',
    confirm: '确认',
    cancel: '取消',
    tips: '请点击确认以取消订单?',

    success: '委托单取消成功',
    orderPlaced: '委托成功',
    succeed: '订单已取消',
    chkLogin: '您需要先登录！',

    succefully: '收藏成功',
    fail: '收藏失败',

    detail: '合约详细资料',
    FAQ: '常见问题',
    reference: '参考资料',
    more: '更多',

    bookList: '买卖盘',

    limit: '限价单',
    market: '市价单',
    limitPositions: '限价',
    marketPositions: '市价',

    stop: '止盈止损',
    stopCrypto: '条件',
    stopLimit: '止盈止损-限价',
    stopMarket: '止盈止损-市价',

    // 交易表单提交验证的气泡提示信息
    lessMinQty: "最小数量为",
    lessMinTotal: "总价至少要",
    setAPrice: "请先设置一个合适的价格",
    emptyPrice: "价格不能为空",
    emptyQty: "数量不能为空",
    emptyTrigger: "触发价不能为空",

    Buy: '买入',
    Sell: '卖出',
    closePosition: '平仓',
    closePosition_tips: '在这里您可以快捷平仓，平仓会向市场提交抵消现有仓位的委托，选择市价立即使用市价委托平仓，请谨慎操作。',
    realizedPNL: '已实现盈亏',
    realizedPNL_tips: '自开仓以来的已实现盈亏。',


    closeLimitWrap: '限价平仓？',
    buyLimitClose: '买入平仓',
    sellLimitClose: '限价卖出',
    whenExecuted: '在执行时，将平调您的整个仓位。',
    limitCloseBtn: '确认限价平仓',


    MarketCloseWrap: "市价平仓？",
    buyMarketClose: '买入平仓',
    sellMarketClose: '市价卖出',
    maketWillClose: '在执行时，将平调您的整个仓位。',
    marketCloseBtn: '确认市价平仓',

    unrealized: '未实现盈亏（回报率%)',
    unrealized_tips: '该合约的未实现盈亏（使用最新成交价格计算），以及回报率。',

    margin: '保证金',
    margin_tips: '该仓位当前使用并锁定的保证金，以及您在该合约使用的杠杆倍数。您可以通过点击下方按钮来添加或减少仓位保证金。',

    addMarginWrap: '添加/减少仓位保证金',
    addMargin: '添加保证金',
    removeMargin: '减少保证金',
    contracts: '张合约',
    currentPosition: '当前仓位',
    assignedMargin: '当前已分配的保证金',
    availableMargin: '可用余额',
    maxRemovable: '最大可减少保证金',
    maxRemovable_tips: '可以把未使用的保证金从仓位移除，注意未实现盈利不能被移除。',
    userRemoveMargin: '移除保证金',

    liqPrice: '强平价格',
    'liqPrice_tips-swap': '当该合约的标记价格低于（多仓）或者高于（空仓）该强平价格时，该仓位会被强制平仓。',
    'liqPrice_tips-forex': '当该合约的指数价格低于（多仓）或者高于（空仓）该强平价格时，该仓位会被强制平仓。',

    markPrice: '标记价格',
    markPrice_tips: '该合约最新的合理标记价格，用来判定强制平仓。会与合约最新成交价格不同，来避免市场价格被操控。不会影响合约的结算，点击查看详细信息。',

    entryPrice: '平均开仓价格',
    entryPrice_tips: '当前多/空仓位的平均开仓买入/卖出价格。',

    value: '价值',
    value_tips: '该仓位的初始名义价值',

    size: '数量',
    size_tips: '该仓位当前的合约数量，整数为多仓，负数为空仓。',

    Contracts: '合约',
    ADL_Ranking: '自动减仓队列',
    ADL_Ranking_tips: '这5个指示灯显示您当前仓位在自动建仓系统中的优先顺序排行。每一盏灯代表了20%优先级的增量。当所有灯都亮起，表示您的仓位位于自动减仓的优先位置，点击查看详情。',

    ROE: '回报率',
    riskLimit: '持仓限额',

    yourPosition: '当前仓位:',
    ContractsNum: '合约数量',
    ROE: '回报率',
    ROE_tips: '回报率 = 未实现盈亏 / 仓位累计保证金',
    riskLimit: '持仓限额',
    riskLimit_tips: '您的账户在该合约最大可持有的仓位额度。如您需要提升持仓限额，请与客服联系。',
    entryPrice_PositionsTips: '当前多/空仓位的平均开仓买入/卖出价格。',
    liqPrice_PositionsTips: '当该合约的标记价格低于（多仓）或者高于（空仓）该强平价格时，该仓位会被强制平仓。',

    orderbook: '委托列表',
    marketTrades: '最近成交',
    added: '累计',

    indexPrice: '指数价格, 即合约标的现货的价格。',
    goHistorical: ' 点击查看历史数据。',
    currentMarkPrice: '当前标记价格，点击查看详情。',

    positions: '活动仓位',
    activeOrders: '活动委托',
    stops: '条件委托',
    orderHistory: '委托历史',
    contractsPositions: '合约',

    orderPrice: '委托价格',
    orderPrice_tips: '限价价格',
    filled: '已成交',
    filled_tips: '委托已经成交的数量，如果委托已经被完全成交，此数值将等于委托数量。',
    remaining: '剩余',
    remaining_tips: '委托剩余可被成交的数量。',
    fillPrice: '平均成交价格',
    fillPrice_tips: '委托目前的平均成交价格。',
    type: '委托类型',
    type_tips: '委托的种类。',
    status: '状态',
    status_tips: '委托的状态。此列的状态包括：新委托，部分成交，完全成交，或已取消。当条件委托被触发后，它会显示在该活动委托列表。',
    timeActive: '委托时间',
    timeActive_tips: '委托提交的时间。',
    action: '操作',

    triggerPrice_tips: '这就是条件委托被触发的价格，当条件委托被触发时，该委托会进入委托列表。在触发后，该条件委托会显示在活动委托列表中。',
    statusStop_tips: '对于新的条件委托，会有两个状态，未触发与已触发。当条件委托未被触发时，它不会被挂到委托列表中，也不会冻结保证金。',
    fillPriceHistory: '成交价格',

    contactDetails: '合约细节:',
    expiryDate: '到期日期',
    perpetual: '永续',
    indexPrice: '指数价格',
    turnover: '24小时交易量',
    openInterest: '未平仓合约数量',
    predicted: '预测',
    fundingRate: '资金费率',
    fundingRate_forex: '隔夜费率',
    predicted_cn: '预测资金费率',
    fundingRate_tips: '这里显示的数字是预测的下一个资金时段的资金费率。如果资金费率是正数，多仓需要付给空仓；如果是负数，空仓付给多仓。该合约的资金流转周期为每8小时一次。',
    fundingRate_fee: '隔夜费会在每日UTC 00:00时对您在该合约持有的仓位，使用该费率与仓位名义价值结算。如果您在该时刻不持有仓位，则不产生隔夜费',
    insuranceFund: '风险准备金',
    insuranceFund_tips: '当前的保险基金余额，该基金用来填补未被执行的强平委托造成的穿仓价值，以避免它们触发自动减仓系统。保险基金的增长来自强平委托在市场上优于破产价的价格成交。',
    contractValue: '合约价值',
    // contractValue_tips:'每一份BTCUSD合约的价值。',

    'markPrice_HeaderTips-swap': '该合约最新的合理标记价格，用来判定强制平仓。会与合约最新成交价格不同，来避免市场价格被操控。不会影响合约的结算，',
    'markPrice_HeaderTips-swap1': '点击查看详细信息。',
    'markPrice_HeaderTips-forex': '该合约最新的指数价格，用来判定强制平仓，指数价格不会影响合约的交易盈亏结算。',
    'markPrice_HeaderTips-forex1': '',

    valueFactor: "最小交易数量100张合约",
    fundingRate_HeaderTips: '该合约当前周期的资金费率，此费率会在倒计时（周期）结束后用来计算在买卖双方之间结算的资金流转数额。当资金费率大于0时，多头付给空头；反之空头付给多头。永续合约的资金流转周期为8小时。',

    highHeader: '24h最高价',
    lowHeader: '24h最低价',
    volumeHeader: '24h成交量',
    changeHeader: '24h涨跌幅',

    noPosition: '暂无仓位',

    TOTAL: '账户余额:',
    TOTAL_tips: '您永续合约的账户余额，账户余额=转入-取出+已实现盈亏',
    AVAIL: '可用余额:',
    AVAIL_tips: '可以用来开仓的保证金余额，可用余额=保证金余额-委托保证金-仓位保证金',

    from: '从',
    to: '至',
    coin: '币种',
    maximum: '全部划转',
    avaliable: '可用',
    enterQty: '请输入数量',

    limit_Tips: '限制该委托在指定（或更好的）价格买入或卖出，限价单可能不会立刻成交。',
    market_Tips: '下单立即执行，以委托列表中的最优价格快速成交，但是由于价格波动，最终的执行价格可能差于您的预期价格。',
    stop_Tips: '条件委托只有在满足预设条件后才会被触发，触发后即为普通的限价或者市价。可以用来实现止损或者止盈策略。',
    leverage: '杠杆',
    leverage_Tips: '杠杆倍数越大，强制平仓风险越大，请谨慎选择!',
    pricePerpetual: '委托价格',
    qtyPerpetual: '合约数量',
    orderValue: '委托价值',
    buy_Long: '买入/做多',
    sell_Short: '卖出/做空',
    cost: '成本',
    post_Only: '被动委托',
    reduce_Only: '只减仓委托',


    Qty_limitTips: '您想买入或卖出的合约数量，详情请参考下方合约细节。',
    Qty_marketTips: '您想买入或卖出的合约数量，详情请参考下方合约细节。请注意，根据变化的价格以及您的可用保证金，市价单有可能不能执行全部的委托数量。',
    orderValue_limitTips: '该委托的总名义价值（BTC）。',
    orderValue_marketTips: '该委托的总名义价值（BTC）,　注意，市价委托的委托价值为估计值。',

    availableMargin_Tips: '可以用来下单开仓的保证金。',
    confirmOrder: '委托确认',

    marketContracts: '张BTCUSD合约',

    yourPosition_buy: '持有仓位',
    afterExecution: '成交后仓位大小',
    markPrice_buy: '当前标记价格',
    estimated: '预期强平价格',
    estimated_tips: '预估强平价格的计算参照当前委托列表中的活动委托，与您最后的强平价格可能不同',

    'Est-swap': '标记价格/预期强平价格 差异',
    'Est-forex': '指数价格/预期强平价格 差异',

    cost_Tips: '本委托所需的保证金，该数值考虑你选择的杠杆和现有仓位。减（平）仓并不需要保证金。',
    cost_stopTips: '条件委托被触发后所需的保证金，该数值考虑你选择的杠杆和现有仓位。注意，这些成本还没有从可用保证金中冻结，如果在条件委托被触发时，您没有足够的可用保证金，则条件委托会被取消。减（平）仓并不需要保证金。',
    execute: '以委托列表内的最优可执行价格执行',
    limit_perpetual: '限价委托',
    market_perpetual: '市价委托',
    stopLimit_perpetual: '条件限价单',
    stopMarket_perpetual: '条件市价单',

    stopLimit_Deal: '条件限价',
    stopMarket_Deal: '条件市价',

    execution: '在条件委托被触发后，该委托的执行价格。',
    triggerPrice_Tips: '在当前最新成交价格达到触发价格时，您的条件委托会被激活。点击查看详情。',


    postOnly_Tips: '被动委托不会立刻在市场成交。使用该类型委托来确保获得做市返佣。如果委托会立刻与已有委托成交，该委托将被取消。',
    reduceOnly_Tips: '只减仓委托只会减少，不会增加你的仓位。系统有可能会自动减少这类委托数量，甚至自动取消它，来确保它不会增加你的仓位。',
    inContact: '',
    inHours: '小时内',


    changesLeverage: '确认修改杠杆？',
    leverageContent: '相同合约的活动委托与活动仓为均使用同一杠杆，在有活动仓位的情况下修改杠杆会改变仓位对保证金的需求，并且影响强平价格，请慎重操作！',
    notShow: "不再提示",

    pending_positions: '提交中',
    new_positions: '新',
    partiallyFilled_positions: '部分成交',
    filled_positions: '完全成交',

    canceled_history: '已取消',
    triggered_history: '已触发',
    completed_history: '已完成',
    untriggered: '未触发',
    cont: '张',

    disconnect: '错误: 服务器断开连接',
    transactionFee: '费率',
    details: '详情',
    closedMarket: '市场关闭。当前不是该合约的交易时间，您可以选择提交条件委托。',
}