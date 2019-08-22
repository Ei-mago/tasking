from aliyunsdkcore.client import AcsClient
from aliyunsdkcore.request import CommonRequest
from tasking.settings import SMSCONFIG
import random

def send_sms(phone, templateParam):
    client = AcsClient(SMSCONFIG['ACCESS_KEY_ID'],
                       SMSCONFIG['ACCESS_KEY_SECRET'], 'default')
    request = CommonRequest()
    request.set_accept_format('json')
    request.set_domain('dysmsapi.aliyuncs.com')
    request.set_method('POST')
    request.set_protocol_type('https')  # https | http
    request.set_version('2017-05-25')
    request.set_action_name('SendSms')
    request.add_query_param('PhoneNumbers', phone)
    request.add_query_param('SignName', SMSCONFIG['SignName'])
    request.add_query_param('TemplateCode',
                            SMSCONFIG['TemplateCode'])
    request.add_query_param('TemplateParam', templateParam)
    response = client.do_action_with_exception(request)
    return str(response, encoding='utf-8')


def ucode():
    import random
    str = ""
    for i in range(6):
        ch = chr(random.randrange(ord('0'), ord('9') + 1))
        str += ch
    return str




if __name__ == "__main__":
    send_sms('15116905290', {'code': '390983'})
