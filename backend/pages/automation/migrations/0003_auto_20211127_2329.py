# Generated by Django 3.2.8 on 2021-11-27 17:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('automation', '0002_auto_20211127_2327'),
    ]

    operations = [
        migrations.AlterField(
            model_name='microbot',
            name='Authors',
            field=models.ManyToManyField(blank=True, related_name='microbot_authors', to='automation.Author'),
        ),
        migrations.AlterField(
            model_name='microbot',
            name='Dependencies',
            field=models.ManyToManyField(blank=True, related_name='microbot_dependencies', to='automation.Dependency'),
        ),
        migrations.AlterField(
            model_name='microbot',
            name='Inputs',
            field=models.ManyToManyField(blank=True, related_name='microbot_inputs', to='automation.Input'),
        ),
        migrations.AlterField(
            model_name='microbot',
            name='Outputs',
            field=models.ManyToManyField(blank=True, related_name='microbot_outputs', to='automation.Output'),
        ),
    ]
