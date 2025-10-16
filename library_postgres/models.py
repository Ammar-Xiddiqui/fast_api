from database import Base
from sqlalchemy import Column , Integer, String
from sqlalchemy.orm import Mapped ,mapped_column
class Books(Base):
    __tablename__="Books"



    id=Column(Integer,primary_key=True,index=True)
    title:Mapped[str]=mapped_column(String)
    author:Mapped[str]=mapped_column(String)
    description:Mapped[str]=mapped_column(String)
    rating:Mapped[int]=mapped_column(Integer)

    

    

