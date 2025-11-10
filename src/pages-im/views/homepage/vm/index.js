import { ViewModel } from '@/shared/class/view-model.js'
export class HomepageVM extends ViewModel {

    showAddFriendPopup = false
    addFriendForm = {
        authInfo: '',
        remark: ''
    }



    constructor() {
        super()
    }
}