---
layout: post
title:  "서버 네트워크 link 모니터링 (PING) 배치 스크립트"
date:   2018-11-21 23:09:16 +0900
categories: etc
---

여러 서버를 관리하는 전산실에서 관리하는 서버들에게 PING테스트를 해보기 위한 배치스크립트를 작성해 보았다.

* 스크립트

```batch

@echo off
cd  .\servers\*
:_loop

FOR %%F IN ( * ) DO (
	ping %%F -n 1 | findstr TTL || echo %%F  ----------------FAIL
)
timeout 10
cls
goto _loop 

```

* 사용법

 1. 스크립트를 읽어보면 알 수 있 듯 스크립트와 같은 경로에 servers폴더를 생성한다.
 2. 서버추가 방법은 IP주소의 이름을 갖는 파일을 생성해 놓으면 된다. (이정도면 쓰기도 편하지 않나)

 ![mage](/images/20181121/ping-batch-script-image1.png)


* 실행 예

 ![mage](/images/20181121/ping-batch-script-image2.png)
