# Node.js
생활코딩 학습

<hr>

## 학습방법

### node.js로 만든 웹 애플리케이션을 만드는 것을 목적으로 한다.
1. 자바스크립트 문법 이해
2. 자바스크립트 문법을 통해서 node.js가 갖고 있는 필요한 기능학습
3. node.js를 통해서 애플리케이션을 하나씩 원성해 나간다.

<br>

## 설치

> Node.js 런타임 설치

> 버전(LTS, Current) LTS 안정된 버전

> 버전 확인 : node -v

> 실행 확인 : <br>
  node
  console.log(1+1);

> 종료 : ctrl + c  두번

node helloworld.js 실행하게 되면 node.js 런타임이라는 프로그램이

코드들을 읽고 그것을 실행시키고 우리에게 보여준다.

## 웹서버 만들기

nodejs는 아파치와 똑같이 웹서버로서 사용 가능 (웹 서버 기능을 내장)
아파치는 할 수 없는 것을 node.js로 가능하다.
웹 서버로서 동작 가능함.

> 실행 커맨드 : node main.js

~~~javascript
var http = require('http');
var fs = require('fs');
var app = http.createServer(function(request,response){
    var url = request.url;
    if(request.url == '/'){
      url = '/index.html';
    }
    if(request.url == '/favicon.ico'){
      response.writeHead(404);
      response.end();
      return;
    }
    response.writeHead(200);
    response.end(fs.readFileSync(__dirname + url)); // 프로그래밍적으로 사용자에게 전송해야할 데이터를 생성
});
app.listen(3000);
~~~

## Template Literal
\n : 줄바꿈

리터털 (정보를 표현하는 방법, 기호)
var a = 1; (1은 숫자라는 데이터를 표현하는 리터럴)
var a = '1'; (문자 1을 표현하는 리터럴)

` (그레이브 액센트)
~~~ javascript
`Dear ${name}

Lorem ipskfsdf~~~~~`
~~~
> \n 이런 탬플릿 리터럴을 사용하지 않고 그레이브 액센트를 사용하여 가독성 좋은 코드를 만들 수 있다.

> 변수 또한 ""+name+"" 이런 작업 필요없이 ${} EL태그를 사용하여 표현이 가능하다.

> ${1+1} 처럼 연산도 가능하다.


## URL

> http : protocol (통신규칙)
>
> host(damian)
> 
> 3000(port) / 80(웹 서버 포트 : 약속)

> 포트번호를 생략하면 기본값 80에 접속

> query String을 통해 서버에 데이터를 전달 가능

## synchronous, asynchronous

> 동기적 방식 ( 기다렸다가 다음 일 진행 )

> 비동기적 방식 ( 동시에 여러가지 일을 하는 것 )
> 효율적이지만 매우 복잡하다.
 
## package Manager

> NPM
> nodejs 설치 시 함께 설치됨

> PM2의 역할
> 어한 이유에서 우리의 서버가 꺼지면 이를 감시하고 있다가 꺼지면 다시 켜주는 역할을 한다.
> 코드 수정 시 껐다 다시 시작해야 했는데 PM2가 수정이 되는지 관찰함 수정되면 자동으로 껐다 다시 킴(불편함을 제거해 줌)
> NPM을 통해 PM2를 설치해보자
> pm2 monit : 현재 실행하고 있는 프로그램 리스트 확인 가능
> pm2 start -main.js --watch : pm2를 실행하고 코드가 수정되면 자동으로 서버를 껐다 킴
> pm2 stop  main : 서버 정지