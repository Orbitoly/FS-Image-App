import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.db.database import Base, get_db
from app import app
from app.db.models import Image, Vote

# Use an in-memory SQLite database for testing
TEST_DATABASE_URL = "sqlite:///:memory:"
engine = create_engine(TEST_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create tables before running tests
Base.metadata.create_all(bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

# Apply test database override
app.dependency_overrides[get_db] = override_get_db

# Create a test client
client = TestClient(app)

@pytest.fixture(autouse=True)
def setup_db():
    # Create tables before each test
    Base.metadata.create_all(bind=engine)
    yield
    # Drop tables after each test
    Base.metadata.drop_all(bind=engine)

def test_create_image():
    response = client.post("/images/", json={"url": "https://example.com/image1.jpg"})
    assert response.status_code == 200
    data = response.json()
    assert data["url"] == "https://example.com/image1.jpg"


def test_get_images():
    # Create a test image first
    client.post("/images/", json={"url": "https://example.com/test.jpg"})
    
    response = client.get("/images/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0


def test_get_votes():
    # Create a test image and vote on it
    pass

def test_vote_on_nonexistent_image():

    pass

