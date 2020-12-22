# electronic-documents-mobile
клиент сервеное приложение. с различными компонентами.
* телефон - Ionic
* web client - angular 8
* server - spring boot
* mysql 8 - бд
* sftp - хранение данных(документов)
* openssl - создание и управление сертификатами для эцп
* docker - развертывание web, sftp, mysql

<p>идея проекта создать приложение по управлению докуменами и их подпианию, разграничив их по организациям.<p>

<p> логин - активность для логина</p>

![Alt text](images/login.png)

<p> profile - активность для упраление своимпровилем</p>

![Alt text](images/profile.png)

<p> organizations - панель с вклажками по управлению организациями</p>

![Alt text](images/organizations.png)

<p> create_organization - создание организации</p>

![Alt text](images/create_organization.png)

<p> organization general главное о организации</p>

![Alt text](images/organization_general.png)

<p> organization members участники, админ может управлять их ролями, которые нужны для подписания</p>

![Alt text](images/organization_members.png)

<p> upload document загрузка документа пока только пдф до 300 мб</p>

![Alt text](images/upload_document.png)

<p> send to signature отправка другим пользователям организации на подписание по роли</p>

![Alt text](images/send_to_signature.png)

<p> my organizations организации польщователя, где он состоит</p>

![Alt text](images/my_organizations.png)

<p> all organizations все публичные организации ( private не будет здесь отбражаться</p>

![Alt text](images/all_organizations.png)

<p> documents  документы органихцаии прошедшие все этапы подписи</p>

![Alt text](images/documents.png)

<p> organization settings управление организацией для админа</p>

![Alt text](images/organization_settings.png)

<p> organization settings roles упралвение ролями для админа</p>

![Alt text](images/organization_settings_roles.png)

<p> show sftp - показываю, что работает sftp</p>

![Alt text](images/show_sftp.png)

<p> docker containers - показываю, что контейнеры запущены в общем пространстве</p>

![Alt text](images/docker_containers.png)

<p> settings requests упралвение заявками в организацию</p>

![Alt text](images/settings_requests.png)

<p> request to user запрос оторганизации пользователю</p>

![Alt text](images/request_to_user.png)

<p> доумент в ожидании ожидание подписания другими участниками</p>

![Alt text](images/document_in_wating.png)

<p> подписание  - процесс подписания своим приватным ключом по паролю</p>

![Alt text](images/signatured.png)

<p> bd in docker - демонстрация mysql из под докер и что поля там зашифрованы, а пароль в хеше</p>

![Alt text](images/bd_in_docker.png)

<p> signatured document уже подписанный документ готовый к использованию. используется пнг с фамилией и инициалами, которая создается при регистрации пользователя</p>

![Alt text](images/signatured_document.png)
