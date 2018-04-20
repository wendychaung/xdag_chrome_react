import React, { Component } from 'react';

import '../sass/page.scss';

class Page extends Component {


  render() {
    const _this = this;
    const { current } = this.props;
    const pageNum = [];
    let begin;
    let len;
    if (_this.props.totalPage > 5) {
      len = 5;
      if (current >= (_this.props.totalPage - 2)) {
        begin = _this.props.totalPage - 4;
      } else if (current <= 3) {
        begin = 1;
      } else {
        begin = current - 2;
      }
    } else {
      len = _this.props.totalPage;
      begin = 1;
    }
    for (let i = 0; i < len; i += 1) {
      const cur = this.props.current;
      let showI = begin + i;
      if (cur == showI) {
        pageNum.push({ num: showI, cur: true });
      } else {
        pageNum.push({ num: showI, cur: false });
      }
    }
    return (
      <div>
        <div className="paginationDiv">
          <a className={this.props.current == 1 ? 'prev disable' : 'prev'} onClick={this.props.goPrev} ><i className="icon-arrow-left icons" /></a>
          <span>
            {
              pageNum.map((curPageNum) => (
                <a
                  key={curPageNum.num}
                  onClick={_this.props.pageClick.bind(_this, curPageNum.num)}
                  className={curPageNum.cur ? 'nums current' : 'nums'} > {curPageNum.num} </a>),
              )
            }
          </span>
          <a
            className={this.props.current == this.props.totalPage ? 'next disable' : 'next'}
            onClick={this.props.goNext} ><i className="icon-arrow-right icons" /></a>
        </div>
      </div>
    );
  }

}

export default Page;
