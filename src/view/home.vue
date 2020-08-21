<template>
    <div class="home">
        <div v-if="clientType === 'phone'" class="questionnaire-phone">
            <div class="questionnaire-phone-item column" v-for="(item, index) in questionnaireList" :key="index">
                <div class="column">
                    <span class="questionnaire-phone-title">{{item.title}}</span>
                    <span class="questionnaire-phone-date">{{'结束时间：' + item.date}}</span>
                </div>
                <div class="questionnaire-phone-operation row con-b align-c">
                    <button class="button-phone-detail" @click="onQueryDetail(item)">问卷详情</button>
                    <button class="button-phone-reset" @click="onReset(item)">重新填写</button>
                </div>
            </div>
        </div>


        <div v-if="clientType === 'pc'" class="questionnaire">
            <div class="questionnaire-item row con-b align-c" v-for="(item, index) in questionnaireList" :key="index">
                <div class="column">
                    <span class="questionnaire-title">{{item.title}}</span>
                    <span class="questionnaire-date">{{item.date}}</span>
                </div>
                <div class="questionnaire-operation row con-b align-c">
                    <button class="button-detail" @click="onQueryDetail(item)">问卷详情</button>
                    <button class="button-reset" @click="onReset(item)">重新填写</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import iMiment from 'miment'

    import iHost from '@/common/js/host.js'
    import iRequest from '@/common/js/request/request.js'
    export default {
        data: function () {
            return {
                clientType: this.$store.state.clientType,
                formCompanyInfo: {},
                questionnaireList: [],
            }
        },

        created: function () {
            if (this.$route.query.isBackstage) {
                console.log('1')
                let funcItem = {
                    'id': '',
                    'dataId': this.$route.query.dataId,
                    'formId': this.$route.query.formId,
                }
                this.onQueryDetail(funcItem)
                return
            } else {
                console.log('2')
                this.queryQuestionnaire()
            }
        },
        methods: {
            /**
             *  查询问卷列表
             *  @function
             *  @param
             *  @returns
             */
            queryQuestionnaire: function () {
                let funcParam = JSON.stringify({
                    // 'userId': this.formCompanyInfo.id
                })

                let funcFormData = new FormData()
                funcFormData.append('requestParam', funcParam)
                iRequest.request(iHost.base + 'f/api/app/v2/questionnaire/questionnaireList', funcFormData, 'file', 'post')
                    .then((funcResponse) => {
                        let funcRawData = funcResponse.list

                        let funcList = []
                        for (let i = 0, l = funcRawData.length; i < l; i++) {
                            let funcItem = {
                                'id': funcRawData[i].questionnaireId,
                                'dataId': funcRawData[i].dataId,
                                'formId': funcRawData[i].formId,
                                'title': funcRawData[i].title,
                                'date': funcRawData[i].endDate,   
                                'source': funcRawData[i].source,
                                'isValid': funcRawData[i].status === '2' ? true : false
                            }
                            funcList.push(funcItem)
                        }
                        this.questionnaireList = funcList
                    })
                    .catch((funcError) => {})
            },

            onQueryDetail: function (funcItem) {
                console.log('onQueryDetail')
                this.$router.push('/questionnairedisplay?id=' + funcItem.id + '&formId=' + funcItem.formId + '&dataId=' + funcItem.dataId)
            },

            onReset: function (funcItem) {
                console.log('onReset')
                this.$router.push('/questionnaireinput?id=' + funcItem.id + '&formId=' + funcItem.formId + '&dataId=' + funcItem.dataId)
            },
        }
    }
</script>

<style lang="less">
    .home {

    }
    // phone 样式
    .questionnaire-phone {
        width: 100vw;
        padding: 0 2.5rem;
        
        .questionnaire-phone-item {
            height: 30rem;
            margin-top: 2.5rem;
            padding: 4.4rem;
            border-radius: 1rem;
            background: #FFFFFF;
            box-shadow: .1rem .5rem 1.5rem 0 rgba(0, 0, 0, 0.1);
            opacity: 0.9;
            
            .questionnaire-phone-title {
                display: block;
                width: 100%;
                font-size: 3.4rem;
                font-weight: 500;
                line-height: 1;
            }

            .questionnaire-phone-date {
                display: block;
                margin-top: 2.8rem;
                font-size: 2.4rem;
                font-weight: 400;
                color: #666666;
                line-height: 1;
            }

            .button-phone-detail {
                width: 25rem;
                height: 6rem;
                margin-top: 5rem;
                border: none;
                border-radius: 3rem;
                background: linear-gradient(90deg,#74BC90,#0C6CB0);
                
                font-size: 2.6rem;
                color: #FFFFFF;
            }

            .button-phone-reset {
                width: 25rem;
                height: 6rem;
                margin-top: 5rem;
                border: none;
                border-radius: 3rem;
                background: linear-gradient(90deg,#E0BE34,#D67E46);
                
                font-size: 2.6rem;
                color: #FFFFFF;
            }
        }
    }

    // pc 样式
    .questionnaire-item {
        width: 1200px;
        height: 120px;
        margin-top: 36px;
        padding: 0 48px;
        border-radius: 10px;
        opacity: 0.9;
        box-shadow: 1px 5px 15px 0px rgba(0, 0, 0, 0.1);
        background: #FFFFFF;

        .questionnaire-title {
            font-size: 20px;
            font-weight: 800;
            color: #000000;
        }

        .questionnaire-date {
            margin-top: 10px;
            font-size: 15px;
            font-weight: 400;
            color: #666666;
        }

        .questionnaire-operation {
            button {
                width: 150px;
                height: 50px;
                margin-left: 22px;
                border: none;
                border-radius: 25px;

                font-size: 18px;
                font-weight: 500;
                color: #FFFFFF;
                line-height: 40px;
            }
            .button-detail {
                background-image: linear-gradient(90deg, #74BC90 , #0C6CB0);
            }

            .button-reset {
                background-image: linear-gradient(90deg, #E0BE34 , #D67E46);
            }
        }
    }
</style>