import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { actions } from "mirrorx";

import Header from 'components/Header';
import QuotaTable from '../quota-table';
import QuotaForm from '../quota-form';

import './index.less';

/**
 * QuotaRoot Component
 */
class QuotaRoot  extends Component {
    constructor(props) {
        super(props);
        this.state = { }
    }
    /**
     *
     */
    componentWillMount() {
        this.getTableData();
    }
    /**
     * 获取table表格数据
     */
    getTableData = () => {
        actions.quota.loadList();
    }

    render() {
        let { pageSize, pageIndex, totalPages} = this.props;
        return (
            <div className='quota-root'>
                <Header title='定额' back={true}/>
                <QuotaForm { ...this.props }/>
                <QuotaTable { ...this.props }/>
            </div>
        )
    }
}
export default QuotaRoot;