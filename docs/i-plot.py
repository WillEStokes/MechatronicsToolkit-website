import plotly.graph_objs as go
import plotly.offline as pyo
import numpy as np

# Define the x, y values for the circle form
t = np.linspace(0, 2*np.pi, 100)
x = np.cos(t)
y = np.sin(t)

# Generate the 2D plot using Plotly
fig = go.Figure(data=[go.Scatter(x=x, y=y, mode='lines', line=dict(width=2, color='black'))])

fig.update_layout(xaxis_range=[-2,2], yaxis_range=[-2,2], yaxis_ticksuffix = "i", autosize=False, width=500, height=500, paper_bgcolor='#FFF8DC', plot_bgcolor='rgba(0,0,0,0)')

# Label the axes "Re" and "Im"
fig.update_layout(xaxis_title='Re', yaxis_title='Im',
    xaxis=dict(title=dict(font=dict(size=26, family='Times New Roman')), linecolor='grey', gridcolor='lightGrey', mirror=True, ticks='outside', showline=True, zerolinecolor = 'lightGrey'),
    yaxis=dict(title=dict(font=dict(size=26, family='Times New Roman')), linecolor='grey', gridcolor='lightGrey', mirror=True, ticks='outside', showline=True, zerolinecolor = 'lightGrey'))

# Add a text annotation indicating that the equation of the line is i
fig.update_layout(annotations=[dict(text="<i>i", showarrow=False, x=0.1, y=1.2, xref="x", yref="y",
    font=dict(color='red', family='DejaVu Sans Mono', size=30))])

# Show the plot
# fig.show()
pyo.plot(fig)