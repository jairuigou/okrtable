# concept
## 周期
按照自然时间，周期分为年，月，星期，日。
周期分为两级，两种粒度，月和星期，星期是小周期，月是大周期。
每个周期有自己的目标，周期的开始制定，结束复盘，周而复始。
大周期和小周期没有相互包含关系，是两个独立的时间线。

## 期望和目标
按照周期的划分，可以制定两种目标，一种是按月执行的，月度目标，另一种是按星期执行的目标。
目标包括目标的基本描述，截止时间，创建时间，优先级，状态，进度描述，截止时间的变化（考虑到可能提前或延期，且有必要记录这种变化），级别（指目标执行周期，月或星期。
在进度描述中，在完成每次关键节点时，进行记录。
需要对过去一段时间内执行目标的情况进行评估，按照两种周期进行评估，分别在各个月的结尾，和各个周的结尾。
月目标和周目标是独立的。
对于更大的目标，需要按照年执行的目标，我称之为期望，不会去追踪一个这样大的目标的执行。在一年开始之前，可以写一些期望，在后续的每个月中，根据这些期望制定月目标，一整年结束之后，可以按照期望复盘。

## cycle
所属周期。每个目标的所属周期，就是该目标当前ddl所在的周期的序号
月份按照年标号 yyyy+0~11
周按照 年标号 yyyy+周序号
如果目标的ddl改变，它的所属周期也改变。(暂定)
## level
执行周期，0-表示按月执行的目标 1-表示按照星期执行的目标。
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
当前在执行的目标。
展示ddl在当前时间向后一个执行周期内的目标
月目标为一组，周目标为一组。

查找以前的目标，可以按照不同的周期向前切换。
过去的目标按照一个周期为一组展示。
ddl在一个周期内的目标展示在一起。
## create & delete
可以自由创建和删除目标，删除的目标将不再留有记录。
## killed
killed状态一般由系统自动更新，根据当前网络时间和object ddl更新。
不想完成这个目标，但也想留有记录时，也可以手动killed掉这个目标。
killed的目标展示在单独的界面中。
## ddl, delay , advance
每个目标都有一个ddl，目标的ddl只能通过delay修改。
1. 手动delay，可以任意制定下一次ddl的时间点。手动delay不会改变自动改变优先级，如果需要，手动调整优先级。
2. 自动delay：针对优先级为low 和 medium的目标，在超过ddl之后，自动delay
优先级为low的目标，自动delay一个执行周期（七天，或者三十天）优先级上升到medium
优先级为medium的目标，自动delay一个执行周期，优先级上升到high
优先级为high的目标，超过ddl之后，自动killed

ddl可以被手动提前
手动改变ddl不会改变优先级
## 状态的转变
1. waiting -> inprog done blocked killed
2. inprog -> done blocked killed
3. blocked -> waiting killed
4. done killed 没有状态转换 
其中转换成block状态的目标，目标的ddl为无穷大，这也就是说，blocked的目标不会在原来制定这个目标的那个周期展示。
会在专门的页面展示所有的blocked目标。
blocked状态转换为waiting状态时，需要指定新的ddl。相应的所属周期也会改变（在目标被blocked的时候，目标所属周期不会改变）
blocked转换为killed状态时，目标会被展示在原来的所属周期上。

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