from simple_image_download import simple_image_download as sim

response = sim.simple_image_download
keyword = "sweet orange fruits"
num_images = 10
response().download(keyword, num_images)

#print(response().urls('batmanjoker', 45))

#response().download('batmanjoker', 5,extensions={'.jpg'})
#print(response().urls('batmanjoker', 5,extensions={'.jpg'}))