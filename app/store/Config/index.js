/**
 * @flow
 * Created by Rabbit on 2018/7/18.
 */

import {observable, action} from 'mobx';
import {AsyncStorage} from 'react-native';

type ErrorInfo = {
	message: string,
	code: number,
}

class ConfigStore {

	@observable isError: boolean = false;
	@observable isLoading: boolean = false;
	@observable errorInfo: ErrorInfo;
	@observable loadingType: string;

	@observable params: any;

	@action.bound setParams(params: any) {
		this.params = params;
	}

	@action.bound showLoading(type?: loadingType) {
		this.loadingType = type ? type : 'normal';
		this.isLoading = true;
	}

	@action.bound hideLoading() {
		this.isLoading = false;
		this.loadingType = 'normal';
	}

	@action.bound showErrorView(e: ErrorInfo) {
		this.isError = true;
		this.errorInfo = e;
	}

	@action.bound hideErrorView() {
		this.isError = false;
	}


	@action.bound isLoadingError(isError: boolean) {
		this.isError = isError;
	}


	@action.bound setVisible(visible: boolean) {
		this.isLoading = visible;
	}

	@action.bound async fetchStartUp() {
		const getToken = await AsyncStorage.getItem('User');
		console.log('存在Token', getToken);
		// if (getSession) alert('存在');

		try {
			// const responseData: responseType = await fetchUserData();
			//
			// const data = responseData.data;
			//
			// const session = data.session;
			// console.log('data', data);
			//
			// if (!getToken || getToken === null || getToken === 'null') {
			// 	await AsyncStorage.setItem('Session', session);
			// 	console.log('不存在Token', session, data);
			// 	// if (getSession) alert('不存在');
			// }
		} catch (e) {
			console.log('e', e);
		}

	}
}

// const configStore = new ConfigStore();
export default ConfigStore;