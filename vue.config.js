

module.exports = {//导出我们的配置
	configureWebpack:{//表示我们要配置我们webpack的config
		resolve:{//配置路径相关的使用resolve
			// extensions:[],//配置文件后缀名省略的
            alias:{//配置别名的
                'assets':'@/assets',
                'common':'@/common',
                'components':'@/components',
                'network':'@/network',
                
                
                
            }
		}
	}
}