# concept
## 期望和目标
将一个自然周定义为一个周期，目标的大小被限制在一个周期内可以完成的任务。
如果目标很大，就应该被分解成可以在一个周期的时间内完成的目标。
期望就是一个方向，一个大的目标，一个不确定的结果。
连续几个周期（一个月）制定一个期望。
目标可以根据期望制定，也可以与期望无关。总之，期望只是一个想法，和期盼，不具备限制力。
目标包括目标的基本描述，截止时间，创建时间，优先级，状态，进度描述。
## state
1. waitiing
创建目标之后的默认状态。
2. inprog
正在进行中
3. done
已经完成
4. blocked
因为某种原因，不能完成，但期望以后有机会完成。
5. killed
ddl之内没完成的目标，会自动转变成killed状态。
## ddl
每个目标都有一个ddl。
blocked的目标ddl无限远。
## priority
1. high
必须在ddl之前完成的内容。
2. medium
期望在ddl之前完成。
3. low
与ddl无关的目标，希望在这个周期内有时间的情况下完成，或者在最近几个周期内完成。
low优先级的目标无需指定ddl，ddl被自动设定为在这个周期的末尾。

# feature
## display
展示ddl在当前周期内的所有目标。
以及最近几个周期内的期望。
todo : 统计界面
## create & delete
可以自由创建和删除目标，删除的目标将不再留有记录。
## killed
killed状态一般由系统自动更新，根据当前网络时间和object ddl更新。
不想完成这个目标，但也想留有记录时，也可以手动killed掉这个目标。
killed的目标展示在单独的界面中。
## ddl, delay , advance
每个目标都有一个ddl，目标的ddl只能通过delay修改。
在ddl之前不能完成的目标，如果期望在下一个周期完成，在ddl到来之前进行delay。
被delay的目标将打上delay记录。
low优先级未完成的目标，自动delay到下个周期，且升高优先级到medium
medium优先级未完成的目标，自动delay到下个周期，需要指定新的ddl，且优先级提高为high。
high优先级未完成的目标，如果不想其转变成killed状态，就要在ddl到来之前手动delay。
delay后的high优先级保持不变。

也就是说，制定一个low优先级的目标，在不主动delay的情况下，目标将保持三个周期，直到第三周期的high优先级，若没完成也没delay，则被kill
如果一个目标很大，需要提前几个月开始准备，那就应该将其写到期望中，并将其拆解成在一个周期内可以完成的若干目标，在周期内完成。
而不是提前两个月制定一个low优先级的目标然后不断delay。如果一直没有时间，也不着急完成，可以先将其block。
总之，low优先级的目标尽量在自动delay两次之内完成。

medium优先级的目标只能delay一次，表示期望提前完成的目标。

high优先级的目标，不能自动delay，只能手动delay。high优先级主要针对时效性很强的目标，错过了，就没机会再次完成。
超过ddl的high优先级目标会被自动killed。

delay是自动或者手动的行为。
自动delay只针对优先级为low 和 medium的目标
low和medium在本周期内未完成，delay到本周期末尾，且不改变优先级。再次未完成的，delay到下个周期，升一级优先级。

可以手动提前ddl。
## block
blocked状态的ddl无限远。
表示那些当前没有资源实现的，但是以后想要完成的目标。
blocked的目标不会展示在主页面上，会有专门的页面，展示所有的blocked状态的目标。
对这些目标指定一个新的ddl来重新激活他。
所有blocked状态的目标的优先级都是low
## 邮件提醒
todo

# component
## Expect
展示当前时间所在的月的期望。
## Object
展示一个目标，包括四个元素：目标描述，优先级标签和状态，delay记录和ddl，进度详细记录
进度记录可以无感知修改。
目标描述一般不修改，可以在二次确认的情况下修改。
自动更新killed state
自动delay
二次确认下可删除
## DdlLabel
ddl标签，展示当前距离ddl所剩时间。
点击事件：可delay或者advance ddl
## DelayLabel
delay标签，在目标每次delay的时候，打上delay标签，标签显示delay。
hover事件：显示第一次制定ddl的时间，和到当前时刻delay了多久
## AdvanceLabel
在ddl提前的时候，打上advance标签。
hover事件：显示第一次制定ddl的时间，和提前了多久。
## PriorLabel
优先级标签。
点击事件：popup可升级，可降级。
## StateLabel
状态标签
显示当前状态
点击事件：改变状态。
## AddObjectButton
创建目标按钮
## SwitchCycle
切换周期，显示之前周期的目标

# implenment
## 目标的编号和请求api
目标的编号方式：yyyy+mounthid+weekid+sequence
### getcurrent
自动获取当前周的目标编号
返回：objectid array
### getbyweekid
根据weekid获取周目标
请求：weekid
返回：objectid array

以上两个请求在app初始化时调用，获取目标id组后，创建相应数量的object组件。
object组件需要objectid
### getcontentbyid
object组件根据objectid获取具体的目标数据
### updatecontentbyid
object组件在目标内容更新后，上传新内容

## 数据模型
### basic info 表
1. Object uid
yyyy+mounthid+weekid+sequence
2. Object descript
目标的描述
3. Priority
优先级
4. State
状态
### ddl表
1. object uid
2. ddl
3. timestamp
    该ddl的创建时间
同一个uid可能有很多个ddl，这表示了该objectddl的变化，按照创建时间排序，可以展示这种变化。
### progress表
1. object uid
2. timestamp
    以天为粒度的时间戳
3. verbose

# 关于甘特图的新构想
按照甘特图的形式，结合颜色，表达目标的进行状态。

## 表格
横轴，时间，粒度，天
纵轴，各个object

一个页面展示一个周期七天。
前后切换一个周期。
考虑到后续需要的目标追踪功能，需要一个可调节粒度和时间段的横轴。
问题：如何将元素和轴坐标对应上。