import { makeAutoObservable } from 'mobx';
import PAGE_STATUS from 'constants/PageStatus';
import { notify } from 'components/Toast';
class ContentListViewModel {
  contentStore = null;
  formStatus = PAGE_STATUS.READY;
  successResponse = {
    state: true,
    content_id: '',
    data: [],
    dataDetail: [],
  };

  constructor(contentStore) {
    makeAutoObservable(this);
    this.contentStore = contentStore;
  }

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.contentStore.getList(this.callbackOnSuccessHandler, this.callbackOnErrorHandler);
  };

  callbackOnErrorHandler = (error) => {
    notify('Update unsuccessfully', 'error');
    this.successResponse.state = false;
    this.successResponse.content_id = error.result;
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnSuccessHandler = (result) => {
    if (result) {
      notify('Successfully', 'success');
    }
    this.formStatus = PAGE_STATUS.READY;
  };
}

export default ContentListViewModel;