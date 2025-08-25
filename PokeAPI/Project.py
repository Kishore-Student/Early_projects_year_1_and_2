import requests
import os
import io
import pygame
os.system("cls" if os.name=="nt" else "clear")
API_url="https://pokeapi.co/api/v2/"
pygame.init()
screen = pygame.display.set_mode((400, 300))
def extract_stats(data):
    return {stat["stat"]["name"]: stat["base_stat"] for stat in data["stats"]}

def info(name):
    url=f"{API_url}/pokemon/{name}"
    response=requests.get(url)

    if response.status_code==200:
        pokemon=response.json()
        return pokemon
    else:
        print("Error!")

name=input("Enter your favourite pokemon's name:")
pokemon_info=info(name)

if pokemon_info:
    print(f'''Name: {pokemon_info["name"].capitalize()}\nID: {pokemon_info["id"]}\nHeight:{pokemon_info["height"]/10} m\nWeight:{pokemon_info["weight"]/10} kg''')
    stats=extract_stats(pokemon_info)
    print(f'''Attack  : {stats["attack"]}\nDefense : {stats["defense"]}\nSpeed   : {stats["speed"]}\nSpatk   : {stats["special-attack"]}\nSpdef   : {stats["special-defense"]}\nHP      : {stats["hp"]}''')
    print(f"Base Stat Total : {sum(stats.values())}")
#__________________________________________________________________________________________________________________________________________________________________________________________________________________________    
    img_url=pokemon_info["sprites"]["front_default"]
    image_bytes = io.BytesIO(requests.get(img_url).content) #Save the image as a file in RAM
    image = pygame.image.load(image_bytes) #Load image from RAM
    image_transformed=pygame.transform.scale(image,(300,300))
    
    screen.blit(image_transformed, (0, 0))
    pygame.display.flip() #display the final image
    running = True
    while running:
        for event in pygame.event.get(): #keep rendering the images repeatedly
            if event.type == pygame.QUIT:
                running = False
                pygame.quit()
