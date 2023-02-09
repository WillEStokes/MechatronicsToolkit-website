import plotly.graph_objs as go
import plotly.offline as pyo
import numpy as np

# Define the x, y, and z values for the helical form
t = np.linspace(0, 20, 200)
z = np.cos(t)
y = np.sin(t)
x = t

# Generate the 3D plot using Plotly
fig = go.Figure(data=[go.Scatter3d(x=x, y=y, z=z, mode='lines', line=dict(width=4, color='black'))])

# Set the orientation of the plot so that we can see its helical form
fig.update_layout(scene=dict(aspectmode='manual', aspectratio=dict(x=3, y=1, z=1), camera=dict(eye=dict(x=-2, y=-1.5, z=1.5))))

# Label the axes "Re" and "Im"
fig.update_layout(scene=dict(xaxis_title='X', zaxis_title='Im', yaxis_title='Re', zaxis_ticksuffix = "i",
                             xaxis=dict(title=dict(font=dict(size=26, family='Times New Roman')), backgroundcolor='#FFF8DC', gridcolor='grey', zerolinecolor = 'lightGrey'),
                             yaxis=dict(title=dict(font=dict(size=26, family='Times New Roman')), backgroundcolor='#FFF8DC', gridcolor='grey', zerolinecolor = 'lightGrey'),
                             zaxis=dict(title=dict(font=dict(size=26, family='Times New Roman')), backgroundcolor='#FFF8DC', gridcolor='grey', zerolinecolor = 'lightGrey')),
                             paper_bgcolor='#FFF8DC',
                             annotations=[dict(text="<i>e<sup>ix</sup>", showarrow=False, x=0.55, y=0.42, font=dict(color='red', family='DejaVu Sans Mono', size=30))])

# Show the plot
# fig.show()
pyo.plot(fig)