import React from 'react';
import mirror, { connect } from 'mirrorx';

// 组件引入
import QuoteCreate from './components/index';

// 数据模型引入
import model from './model'
mirror.model(model);

// 数据和组件UI关联、绑定
export const ConnectedQuoteCreate = connect( state => state.quote, null )(QuoteCreate);
