import React, { Component } from 'react';
import axios from 'axios';

import Headers from './header';
import Loading from './loading';
import Tips from './tips';

import '../sass/public.scss';
import '../sass/hashrate.scss';

class Hashrate extends Component {

  constructor(props) {
    super(props);
    this.initData = this.initData.bind(this);
    this.state = {
      loading: true,
			network_blocks: null,
			network_main_blocks: null,
      network_hashrate: null,
      difficulty: null,
      difficulty_exact: null,
			network_supply: null,
      tipsBoxVisible: false,
    };
  }
  componentWillMount() {
    this.initData(this.cur);
  }
  initData() {
    axios.get('http://xdagscan.com/api/explorer/index')
      .then((response) => {
        const {
          network_blocks, network_main_blocks, network_hashrate, difficulty, difficulty_exact, network_supply,
        } = response.data.data;
        this.setState({ loading: false });
        this.setState({ network_blocks });
        this.setState({ network_main_blocks });
        this.setState({ network_hashrate });
        this.setState({ difficulty });
        this.setState({ difficulty_exact });
        this.setState({ network_supply });
      })
      .catch(() => {
        this.setState({ loading: false });
        this.setState({ tipsBoxVisible: true });
      });
  }
  closeTipsBox() {
    this.setState({
      tipsBoxVisible: false,
    });
  }
  render() {
    const {
			network_blocks,
			network_main_blocks,
      network_hashrate,
      difficulty,
      difficulty_exact,
			network_supply,
      loading,
      tipsBoxVisible,
    } = this.state;
    return (
      <div>
        { loading && <Loading />}
        { tipsBoxVisible && <Tips closeTipsBox={this.closeTipsBox} />}
        <div className="explorerTop">
          <Headers />
          <div className="top12">
            <div className="netHashrate">
              <div>NETHASHRATE</div>
              <div className="numH">
                <div>{network_hashrate && network_hashrate.split(' ')[0]}</div>
                <div className="unit">{network_hashrate && 'TH/s'}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="explorerContent">
          <div className="hashrate">
            <ul>
              <li className="blocks">
                <div>
                  <i className="icon-layers icons" />
                </div>
                <div className="hashTag">blocks</div>
                <div className="hashCont">{network_blocks}</div>
              </li>
              <li className="main">
                <div>
                  <i className="icon-puzzle icons" />
                </div>
                <div className="hashTag">mainBlocks</div>
                <div className="hashCont">{network_main_blocks}</div>
              </li>
              <li className="difficulty">
                <div>
                  <i className="icon-tag icons" />
                </div>
                <div className="hashTag">Hashrate Chart</div>
                <div className="hashCont diff">
									<a href="http://xdagscan.com/index.html" target="_blank" rel="noreferrer noopener">more &gt; &gt;</a>
                </div>
              </li>
              <li className="supply">
                <div>
                  <i className="icon-present icons" />
                </div>
                <div className="hashTag">supply</div>
                <div className="hashCont">{network_supply && network_supply.split(' ')[0]}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

}


export default Hashrate;
