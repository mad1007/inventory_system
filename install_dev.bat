
CALL cd .\backend
CALL py -m venv env
CALL .\env\Scripts\activate
CALL pip install -r requirements.txt
CALL py manage.py migrate core_auth
CALL py manage.py migrate 
CALL py manage.py createsuperuser

CALL cd ..
CALL cd .\frontend
CALL npm i
CALL echo Ready to roll
