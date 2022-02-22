import {store} from "../redux/store/store";
import AdminHttp from "../http/adminHttp";

const dispatch = store.dispatch;

export async function addArtToServer(data) {
    await AdminHttp.add(data)
}
