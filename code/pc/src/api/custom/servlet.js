function servlet(optionals) {

    return Object.assign({

        symbol: 'btcusdt', //默认商品设置
        interval: "1",       //默认请求间隔
        // fullscreen: false,  //默认是否全屏
        autosize: true,     //默认是否自适应
        container_id: 'trading-view', //设置容器
        datafeed: null,
        library_path: '/static/Kline/charting_library/',
        enabled_features: [],
        timezone: 'Asia/Shanghai',
        locale: 'en',
        debug: false,
        toolbar_bg: "#f1f3f6",//设置默认工具条背景颜色
        style: "1",
        hide_side_toolbar: false,
        withdateranges: true,
        allow_symbol_change: true,
        theme: "light",

        // time_frames: [
        //     { text: "50y", resolution: "6M", description: "50 Years" },
        //     { text: "3y", resolution: "W", description: "3 Years", title: "3yr" },
        //     { text: "8m", resolution: "D", description: "8 Month" },
        //     { text: "3d", resolution: "5", description: "3 Days" },
        //     { text: "1000y", resolution: "W", description: "All", title: "All" },
        // ],
        
        drawings_access: {
            type: "black",
            tools: [
                { name: "Trend Line", grayed: true },
                { name: "Trend Angle", grayed: true }
            ]
        },

        charts_storage_api_version: "1.1",
        client_id: "tradingview.com",

        //设置默认不显示组件
        disabled_features: [
            'header_symbol_search',
            // "use_localstorage_for_settings",
            // "left_toolbar",
            // 'legend_context_menu',
            // "border_around_the_chart",
            // "timeframes_toolbar",
            "volume_force_overlay",
            // "pane_context_menu",
            // "header_symbol_search",
            // "symbol_search_hot_key",
            // "header_undo_redo",
            // "header_compare",
            // "header_chart_type",
            // "header_screenshot",
            // "header_resolutions",
            // "header_settings",
            // "header_indicators"
        ],

        //设置初始化样式配置
        overrides: {
            // "mainSeriesProperties.candleStyle.upColor": "#589065",
            // "mainSeriesProperties.candleStyle.downColor": "#AE4E54",
            // "mainSeriesProperties.candleStyle.drawWick": true,
            // "mainSeriesProperties.candleStyle.wickUpColor:": '#AE4E54',
            // "mainSeriesProperties.candleStyle.wickDownColor": "#AE4E54",
            // "mainSeriesProperties.candleStyle.drawBorder": true,
            // "mainSeriesProperties.candleStyle.borderUpColor": "#589065",
            // "mainSeriesProperties.candleStyle.borderDownColor": "#AE4E54",
            // "paneProperties.background": "#121a2e",
            // "paneProperties.vertGridProperties.color": "#1e273c",
            // "paneProperties.vertGridProperties.style": 0,
            // "paneProperties.horzGridProperties.color": "#1e273c",
            // "paneProperties.horzGridProperties.style": 0,
            // "scalesProperties.lineColor": "#505d7b",
            // "scalesProperties.textColor": "#333e58",
            // "paneProperties.legendProperties.showLegend": false,
            // //"scalesProperties.showLeftScale":false,
            // "volumePaneSize": "medium",
            // "MACDPaneSize": "tiny",
        },

        //设置初始化加载条样式
        loading_screen: {
            // "backgroundColor": "#1e222d",
            // "foregroundColor": "#5d7d93"
        },

        studies_overrides: {
            //设置成交量默认样式
            // "volume.volume.color.0": "rgba(174,78,84,0.7)",
            // "volume.volume.color.1": "rgba(88,144,101,0.7)",
        }

    }, optionals);
}

export default servlet;
