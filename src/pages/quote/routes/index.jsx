/**
 * 前端路由说明：
 * 1、基于浏览器 History 的前端 Hash 路由
 * 2、按业务模块和具体页面功能划分了一级路由和二级路由
 */
import React from "react";
import {Route} from "mirrorx";
import {ConnectedQuoteCreate} from "../container";

export default () => (
    <div className="route-content">
        <Route exact path="/" component={ConnectedQuoteCreate}/>
        {/*<Route exact path="/employee" component={ConnectedEmployee}/>*/}
    </div>

)
