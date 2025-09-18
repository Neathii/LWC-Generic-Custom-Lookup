import { LightningElement, api, track, wire } from 'lwc';
import searchRecords from '@salesforce/apex/customLookupController.searchRecords';

export default class CustomLookup extends LightningElement {
    @api apiName = 'Account';
    @api objectLabel = 'Account';
    @api iconName = 'standard:account';

    searchvalue = '';
    delayTimeout;
    selectedRecord = {
        selectedId: '',
        selectedName: ''
    };
    displayOptions = false;

    @wire(searchRecords, { objectApiName: '$apiName', searchKey: '$searchvalue' })
    outputs;

    get isRecordSelected() {
        return this.selectedRecord.selectedId !== '';
    }

    get searchResults() {
        if (this.outputs && this.outputs.data) {
            console.log('✅ Wired search results:', this.outputs.data);
            return this.outputs.data;
        }
        if (this.outputs && this.outputs.error) {
            console.error('❌ Wire error:', this.outputs.error);
        }
        return [];
    }

    changeHandler(event) {
        window.clearTimeout(this.delayTimeout);
        let enteredValue = event.target.value;

        this.delayTimeout = setTimeout(() => {
            this.searchvalue = enteredValue;
            this.displayOptions = true;
            console.log('🔁 searchvalue updated:', this.searchvalue);
        }, 300);
    }

    clickHandler(event) {
        let selectedId = event.currentTarget.dataset.item;
        let outputRecord = this.searchResults.find(item => item.Id === selectedId);

        if (outputRecord) {
            this.selectedRecord = {
                selectedId: outputRecord.Id,
                selectedName: outputRecord.Name
            };
        }
        this.displayOptions = false;
    }

    removalSectionHandler() {
        this.selectedRecord = {
            selectedId: '',
            selectedName: ''
        };
        this.displayOptions = false;
    }
}







/*import { LightningElement, wire, api, track} from 'lwc';
import searchRecords from "@salesforce/apex/customLookupController.searchRecords";

export default class CustomLookup extends LightningElement {
    @api apiName = "Account";
    searchvalue = '';
    @api objectLabel = "Account";
    @api iconName = "standard:account";
    delayTimeout;
    selectedRecord = {
      selectedId: "",
      selectedName: ""
    };
    displayOptions = false;
    @wire (searchRecords, {
            objectApiName: "$apiName", 
            searchKey: "$searchvalue"
        }) 
    outputs;

    get isRecordSelected(){
      return this.selectedRecord.selectedId === "" ? false : true;
    }

changeHandler(event){
  window.clearTimeout(this.delayTimeout);
  let enteredValue = event.target.value; 
  //debouncing - do not update the reactive property as long as this function is being called within a delay

  this.delayTimeout = setTimeout(() => {
    this.searchvalue = enteredValue;
    this.displayOptions = true;
  }, DELAY);
}

   clickHandler(event){
      let selectedId = event.currentTarget.dataset.item;
      console.log("selectedId", selectedId);
      let outputRecord = this.outputs.data.find(
      (currItem) => currItem.Id === selectedId);
      this.selectedRecord = {
        selectedId: outputRecord.Id,
        selectedName: outputRecord.Name
      };   
      this.displayOptions = false;
    }
removalSectionHandler(event){
  this.selectedRecord ={
    selectedId: "",
    selectedName: ""
  };
  this.displayOptions = false;
}
}*/