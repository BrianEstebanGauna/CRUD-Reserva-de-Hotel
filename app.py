from flask import Flask,jsonify,request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app=Flask(__name__) #Crea el objeto app de la clase Flask
CORS(app) #permite acceder desde el front al back

# configuro la base de datos, con el nombre el usuario y la clave
# app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://user:password@localhost/proyecto'
app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://root:@localhost/proyecto'
# URI de la BBDD                          driver de la BD  user:clave@URLBBDD/nombreBBDD
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False #none
db= SQLAlchemy(app)   #crea el objeto db de la clase SQLAlquemy
ma=Marshmallow(app)   #crea el objeto ma de de la clase Marshmallow

# ---------fin configuracion-----------

#definimos la tabla
class Reserva(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    nombre=db.Column(db.String(100))
    precio=db.Column(db.Integer)
    dni=db.Column(db.Integer)
    checkin=db.Column(db.String(20))
    checkout=db.Column(db.String(20))
    habitacion=db.Column(db.String(100))
    imagen=db.Column(db.String(400))
    def __init__(self,nombre,precio,dni,checkin,checkout,habitacion,imagen):
        self.nombre = nombre
        self.precio = precio
        self.dni = dni
        self.checkin = checkin
        self.checkout = checkout
        self.habitacion = habitacion
        self.imagen = imagen

    #Si hay mas tablas para crear las definimos aca

with app.app_context():
    db.create_all() #Crea las tablas

class ReservaSchema(ma.Schema):
    class Meta:
        fields=('id','nombre','precio','dni','checkin','checkout','habitacion','imagen')
    
reserva_schema=ReservaSchema() #El objeto para traer un producto
reservas_schema=ReservaSchema(many=True) #Trae muchos registro de producto



#Creamos los endpoint
#GET
#POST
#Delete
#Put

#Get endpoint del get
@app.route('/reservas',methods=['GET'])
def get_Reservas():
    all_reservas = Reserva.query.all() #heredamos del db.model
    result= reservas_schema.dump(all_reservas) #lo heredamos de ma.schema
                                                #Trae todos los registros de la tabla y los retornamos en un JSON
    return jsonify(result)


@app.route('/reservas/<id>',methods=['GET'])
def get_reserva(id):
    reserva=Reserva.query.get(id)
    return reserva_schema.jsonify(reserva)   # retorna el JSON de un producto recibido como parametro




@app.route('/reservas/<id>',methods=['DELETE'])
def delete_reserva(id):
    reserva=Reserva.query.get(id)
    db.session.delete(reserva)
    db.session.commit()
    return reserva_schema.jsonify(reserva)   # me devuelve un json con el registro eliminado


@app.route('/reservas', methods=['POST']) # crea ruta o endpoint
def create_reserva():
    #print(request.json)  # request.json contiene el json que envio el cliente
    nombre=request.json['nombre']
    precio=request.json['precio']
    dni=request.json['dni']
    checkin=request.json['checkin']
    checkout=request.json['checkout']
    habitacion=request.json['habitacion']
    imagen=request.json['imagen']
    new_reserva=Reserva(nombre,precio,dni,checkin,checkout,habitacion,imagen)
    db.session.add(new_reserva)
    db.session.commit()
    return reserva_schema.jsonify(new_reserva)


@app.route('/reservas/<id>' ,methods=['PUT'])
def update_reserva(id):
    reserva=Reserva.query.get(id)
 
    reserva.nombre=request.json['nombre']
    reserva.precio=request.json['precio']
    reserva.dni=request.json['dni']
    reserva.checkin=request.json['checkin']
    reserva.checkout=request.json['checkout']
    reserva.habitacion=request.json['habitacion']
    reserva.imagen=request.json['imagen']


    db.session.commit()
    return reserva_schema.jsonify(reserva)

#Programa Principal
if __name__ == '__main__':
    app.run(debug=True, port=5000)