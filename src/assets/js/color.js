import Vue from 'vue'
import axios from 'axios'

export default function color() {
    // 绿色
    var Url = "http://smlc.app.fuyulove.com/"

    // 蓝色
    // var Url = "http://ctbz.app.fuyulove.com/"

    // 线上
    // var Url = '/'

    axios.get(Url + 'api/config/get', {

        })
        .then((res) => {
            console.log("颜色", res.data); //请求的返回体
            localStorage.setItem("color", res.data.data.coloritem[0].color || "#52aa5e")
            localStorage.setItem("bgcolor", res.data.data.coloritem[0].bgcolor || "#329440")

        })
        .catch((error) => {
            console.log(error); //异常
        });

}
Vue.prototype.$color = color