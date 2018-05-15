/**
 * @flow
 * Created by Rabbit on 2018/5/4.
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
} from 'react-native';

import {loadBuDeJieData, loadWealPictureData} from "../../../servers/News";
import { TableList } from '../../../components';
import type {RTBDJList, RTWeal} from "../../../servers/News/interfaces";
import { BuDeJieMobx } from '../../../mobx/News/BuDeJieMobx';
import { observer } from "mobx-react";
import { BaseItem } from "./Components";

type Props = {
  type: number
};


@observer
export class BuDeJie extends React.Component<any, any> {

  BuDeJieMobx: BuDeJieMobx;

  constructor(props: Props) {
    super(props);
    this.BuDeJieMobx = new BuDeJieMobx();
  }

  onFetch = async ( value: any = this.BuDeJieMobx.maxtime, startFetch: any, abortFetch: any) => {
    try {
      await this.BuDeJieMobx.fetchBuDeJieData(this.props.type, value);
      startFetch(this.BuDeJieMobx.dataSource.slice(), 20)
    } catch (e) {
      abortFetch();
      console.log(e)
    }
  }

  renderItem = ( {item, index}: any ) => {
    return(
      <BaseItem itemData={item}/>
    )
  }


  render() {
    return (
        <TableList
          style={{backgroundColor: 'white'}}
          onFetch={this.onFetch}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
          initialNumToRender={20}
          paginationType={'value'}
        />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});