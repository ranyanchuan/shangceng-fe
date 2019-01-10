import React from 'react';
import mirror, { connect } from 'mirrorx';

// 组件引入
import QuotaTable from './components/quota-root/QuotaTable';
import QuotaSelectTable from './components/quota-root/QuotaSelectTable';
import QuotaPaginationTable from './components/quota-root/QuotaPaginationTable';
import QuotaEdit from './components/quota-edit/Edit';
import QuotaBpmChart from './components/quota-bpm-chart'
// 数据模型引入
import model from './model'
mirror.model(model);

// 数据和组件UI关联、绑定
export const ConnectedQuotaTable = connect( state => state.quota, null )(QuotaTable);
export const ConnectedQuotaSelectTable = connect( state => state.quota, null )(QuotaSelectTable);
export const ConnectedQuotaPaginationTable = connect( state => state.quota, null )(QuotaPaginationTable);
export const ConnectedQuotaEdit = connect( state => state.quota, null )(QuotaEdit);
export const ConnectedQuotaBpmChart = connect( state => state.quota, null )(QuotaBpmChart);
