from datetime import datetime

from django.db import models


#================
#**   工单所涉及的表单
#**   三个表暂时没建外键，数据量小，建议使用者使用外键。
#**
#=================
from usermanage.models import User


class ServiceList(models.Model):

    """
    服务目录表
    pid ： 一级目录
    mid ： 二级目录
    sid ： 三级目录
    service_name ： 服务项
    """

    id = models.AutoField(primary_key=True)
    pid = models.IntegerField(null=False)
    mid = models.IntegerField(null=False)
    sid = models.IntegerField(null=False)
    service_name = models.CharField(max_length=30,null=False)
    create_time = models.DateTimeField(default=datetime.now)
    modify_time = models.DateTimeField(null=True)

    class Meta:
        db_table = 'service_list'



class OrderInfo(models.Model):

    """
    工单信息表
    
    id: 自增id ,也作为工单id 使用
    customer : 客户，存客户姓名 
    order_status : 工单状态
    opreate_id : 客服 
    copyfor : 抄送
    question :  问题类型
    service_list :  服务清单，对应服务清单表
    sign : 订单标记 
    title : 工单title
    content : 工单内容
    remarks : 工单备注
    priority :优先级
    """

    id = models.AutoField(primary_key=True)
    customer = models.CharField(max_length=50,null=False)
    opreate_id = models.CharField(max_length=50,default='platform')
    copyfor =  models.CharField(max_length=50,null=True)
    question_type = (
        ('1','问询'),
        ('2', '任务'),
        ('3', '问题'),
        ('4', '事件'),
        ('5', '其他')
    )
    question = models.CharField(max_length=20,choices=question_type)
    service_list  = models.CharField(max_length=50,null= False)
    order_status_enum = (
        ('0','未受理'),
        ('1','处理中'),
        ('2','已解决'),
        ('3','已关闭'),
        ('4','延期'),
        ('5','超时'),
        ('9','已关闭')
    )
    order_status = models.IntegerField(
        default=0,
        choices=order_status_enum
    )
    sign = models.CharField(max_length=30,null=True)
    title = models.CharField(max_length=50,null=False)
    content = models.CharField(max_length=256,null=False)
    remarks  = models.CharField(max_length=256,null=True)
    priority_enum = (
        ('P0','紧急'),
        ('P1','高'),
        ('P2','中'),
        ('P3','低')
    )
    priority = models.CharField(max_length=10,choices=priority_enum)
    create_time = models.DateTimeField(default=datetime.now)
    modify_time = models.DateTimeField(null=True)

    class Meta:
        db_table = 'order_info'


class OrderOperate(models.Model):

    """
    工单操作表
    
    order_id :  订单id，对应工单信息表
    operate_id : 操作人，对应客服表
    from_status : 初始状态
    to_status : 目标状态
    replay : 回复
    
    """

    id = models.AutoField(primary_key=True)
    order_id = models.IntegerField(null=False)
    operate_id = models.IntegerField(null=False)
    # from_opreate_id = models.IntegerField(null=False)
    # to_opreate_id = models.IntegerField(null=False)
    from_priority = models.CharField(max_length=30,null=False)
    to_priority = models.CharField(max_length=30,null=False)
    from_status = models.IntegerField(null=False)
    to_status = models.IntegerField(null=False)
    from_copyfor = models.CharField(max_length=30,null=False)
    to_copyfor = models.CharField(max_length=30,null=False)
    replay = models.CharField(max_length=256)
    create_time = models.DateTimeField(default=datetime.now)

    class Meta:
        db_table = 'order_operate'


